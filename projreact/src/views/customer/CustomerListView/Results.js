import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
	Box,
	Card,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	makeStyles,
} from "@material-ui/core";
import {
	DollarSign
} from "react-feather";
import Toolbar from "./Toolbar";

const useStyles = makeStyles((theme) => ({
	root: {},
	avatar: {
		marginRight: theme.spacing(2),
	},
	icon: {
		marginRight: theme.spacing(1)
	},
	title: {
		marginRight: 'auto'
	},
}));

const Results = ({ className, loading, ...rest }) => {
	const classes = useStyles();

	const [customers, setCustomers] = useState([]);

	// Search stuff
	const [search, setSearch] = useState("");
	// -- Search stuff

	// Pagination stuff
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [count, setCount] = useState(0);
	const handleLimitChange = (event) => {
		setSize(event.target.value);
	};
	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	// -- Pagination stuff
	// Fazer chamada à API para obter produtos
	// Ao início e sempre que page e size sejam alterados
	// Update list every second because of last visit
	useEffect(() => {
		getCustomers();
		const loop = setInterval(() => {
			getCustomers();
		}, 1000);
		return () => clearInterval(loop);
	}, [page, size, search]);

	async function getCustomers() {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
		let url = "http://127.0.0.1:8080/api/admin/persons?page=" + page + "&size=" + size;
		if (search !== "") {
			url += "&name=" + search;
		}
		const response = await fetch(url, requestOptions);
		const data = await response.json();
		// Update categories
		// Only show clients
		setCustomers(data['clients'].filter(c => c.type === "CLIENT"));
		setCount(data["totalItems"]);
		// Remove loading
		loading(false);
	}

	return (
		<div>
			<Toolbar
				search={search}
				setSearch={setSearch}
			/>
			<Card className={clsx(classes.root, className)} {...rest}>
				<PerfectScrollbar>
					<Box minWidth={1050}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>NIF</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Last Visit</TableCell>
									<TableCell>Latest Purchases</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{customers.map((customer) => (
									<TableRow hover key={customer.nif}>
										<TableCell>
											<Typography
												color="textPrimary"
												variant="body1"
											>
												{customer.name}
											</Typography>
										</TableCell>
										<TableCell>{customer.nif}</TableCell>
										<TableCell>{customer.email}</TableCell>
										<TableCell>
											{moment(customer.lastVisit).format('DD/MM/YYYY, HH:mm:ss')}
										</TableCell>
										<TableCell>
											<Button
												variant="contained"
												component={RouterLink}
												to={'/admin/orders?nif=' + customer.nif}
											>
												<DollarSign className={classes.icon} size="20" />
												<span className={classes.title}>Purchases</span>
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Box>
				</PerfectScrollbar>
				<TablePagination
					component="div"
					count={count}
					onChangePage={handlePageChange}
					onChangeRowsPerPage={handleLimitChange}
					page={page}
					rowsPerPage={size}
					rowsPerPageOptions={[5, 10, 25]}
				/>
			</Card>
		</div>
	);
};

Results.propTypes = {
	className: PropTypes.string,
	customers: PropTypes.array.isRequired,
};

export default Results;
