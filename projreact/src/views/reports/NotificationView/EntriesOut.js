import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {Url} from "src/ApiConsts";
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

const EntriesOut = ({ className, ...rest }) => {
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
	};
	// /Pagination stuff

	// Initialize and update every time props change
	useEffect(() => {
		// Load last notitications from API
		getLastNotifications();

		// Subscribe to socket for updates
		const socket = new SockJS("http://localhost:8080/api/ws");
		const stompClient = Stomp.over(socket);
		const headers = {};

		stompClient.connect(headers, () => {
			stompClient.subscribe("/topic/enter_store", function(
				messageOutput
			) {
				const not = JSON.parse(messageOutput.body);
				setNotifications((oldArray) => {
					const newArray = [...oldArray, not];
					return newArray;
				});
			});
			stompClient.subscribe("/topic/exit_store", function(messageOutput) {
				const not = JSON.parse(messageOutput.body);
				setNotifications((oldArray) => {
					const newArray = [...oldArray, not];
					return newArray;
				});
			});
		});
	}, []);

	async function getLastNotifications() {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};
		const response = await fetch(
			Url + "/api/admin/notifications_entered_left",
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
			<CardHeader title="People in/out store Notifications" />
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
												notification.type ===
												"ENTERED_STORE"
													? "Entered Store"
													: "Exited Store"
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

EntriesOut.propTypes = {
	className: PropTypes.string,
};

export default EntriesOut;
