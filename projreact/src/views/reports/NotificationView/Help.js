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
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [count, setCount] = useState(0);
	const handleLimitChange = (event) => {
		setSize(event.target.value);
	};
	const handlePageChange = (event, newPage) => {
		setPage(newPage);
		// Make new request
		getLastNotifications();
	};
	// -- Pagination stuff

	// Initialize component
	useEffect(() => {
		// Load last notitications from API
		getLastNotifications();
	}, [page, size]);

	useEffect(() => {
		// Subscribe to socket for updates
		const socket = new SockJS("http://localhost:8080/api/ws");
		const stompClient = Stomp.over(socket);
		const headers = {};

		stompClient.connect(headers, () => {
			stompClient.subscribe("/topic/help", function (messageOutput) {
				const not = JSON.parse(messageOutput.body);
				// Only add notifications on first page
				if (page == 0) {
					setNotifications((oldArray) => [not, ...oldArray.slice(0, size-1)]);
				}
				setCount(lastCount => lastCount + 1);
			});
		});

		return () => stompClient && stompClient.disconnect();
	}, []);

	async function getLastNotifications() {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};
		const url = "http://127.0.0.1:8080/api/work/notifications_help?page=" + page + "&size=" + size;
		const response = await fetch(
			url,
			requestOptions
		);
		const data = await response.json();
		// Update value with notifications from server
		setNotifications(data["notifications"]);
		// Update count
		setCount(data["totalItems"]);
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
						{notifications.map((notification) => (
							<TableRow hover key={notification.id}>
								<TableCell>{notification.nif}</TableCell>
								<TableCell>
									{moment(notification.date).format(
										"DD/MM/YYYY, HH:mm:ss"
									)}
								</TableCell>
								<TableCell>
									<Chip
										color={notification.state === "PENDING" ? "secondary" : "primary"}
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
					count={count}
					onChangePage={handlePageChange}
					onChangeRowsPerPage={handleLimitChange}
					page={page}
					rowsPerPage={size}
					rowsPerPageOptions={[10]}
				/>
			</Box>
		</Card>
	);
};

Help.propTypes = {
	className: PropTypes.string,
};

export default Help;
