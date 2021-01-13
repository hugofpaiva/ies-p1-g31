import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
	Box,
	Card,
	CardHeader,
	Chip,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	TablePagination,
	makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {},
	actions: {
		justifyContent: "flex-end",
	},
}));

const Help = ({ className, ...rest }) => {
	const classes = useStyles();
	const [notifications, setNotifications] = useState([]);

	// Pagination stuff
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};
	const handlePageChange = (event, newPage) => {
		setPage(newPage);
		// When not first page, update state
		if (newPage !== 0) {
			updatePageStatus(newPage);
		}
	};
	// /Pagination stuff

	// Initialize component
	useEffect(() => {
		// Load last notitications from API
		getLastNotifications();

		// Subscribe to socket for updates
		const socket = new SockJS("http://localhost:8080/api/ws");
		const stompClient = Stomp.over(socket);
		const headers = {};

		stompClient.connect(headers, () => {
			stompClient.subscribe("/topic/help", function(messageOutput) {
				const not = JSON.parse(messageOutput.body);
				setNotifications((oldArray) => {
					const newArray = [...oldArray, not];
					return newArray;
				});
			});
		});
	}, []);

	// Update page status
	async function updatePageStatus(newPage) {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};
		// Foreach page notification
		await Promise.all(
			notifications
				.slice(newPage * limit, newPage * limit + limit)
				.map(async (notification) => {
					// Update status
					const url =
						"http://127.0.0.1:8080/api/work/notifications_help/" +
						notification["id"];
					const response = await fetch(url, requestOptions);
					const data = await response.json();
					notification["state"] = data["state"];
				})
		);
		setNotifications(notifications);
	}

	async function getLastNotifications() {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};
		const response = await fetch(
			"http://127.0.0.1:8080/api/work/notifications_help",
			requestOptions
		);
		const data = await response.json();
		// Update value with notifications from server
		setNotifications((not) => {
			const newNotifications = [...not];
			data["notifications"].forEach((notification) => {
				newNotifications.push(notification);
			});
			// Return sorted version
			return newNotifications;
		});
	}

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardHeader title="Help needed Notifications" />
			<Divider />
			<Box minWidth={500}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Customer NIF</TableCell>
							<TableCell>
								<TableSortLabel active direction="desc">
									Date
								</TableSortLabel>
							</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{notifications
							.sort((not) => -1 * not["date"])
							.slice(page * limit, page * limit + limit)
							.map((notification) => (
								<TableRow hover key={notification.id}>
									<TableCell>{notification.nif}</TableCell>
									<TableCell>
										{moment(notification.date).format(
											"DD/MM/YYYY, HH:mm:ss"
										)}
									</TableCell>
									<TableCell>
										<Chip
											color="primary"
											label={
												notification.state[0] +
												notification.state
													.substring(
														1,
														notification.state
															.length
													)
													.toLowerCase()
													.replace("_", " ")
											}
											size="small"
										/>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				<TablePagination
					component="div"
					count={notifications.length}
					onChangePage={handlePageChange}
					onChangeRowsPerPage={handleLimitChange}
					page={page}
					rowsPerPage={limit}
					rowsPerPageOptions={[5, 10]}
				/>
			</Box>
		</Card>
	);
};

Help.propTypes = {
	className: PropTypes.string,
};

export default Help;
