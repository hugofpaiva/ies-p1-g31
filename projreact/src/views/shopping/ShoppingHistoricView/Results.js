import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {Url} from "src/ApiConsts";
import {
	Avatar,
	Box,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	TableSortLabel,
	makeStyles,
} from "@material-ui/core";
import getInitials from "src/utils/getInitials";
import Bill from "./Bill";

/*
{
  "nproducts": 1,
  "total": 710,
  "transaction": {
    "id": 4,
    "client": {
      "nif": 630114163,
      "name": "José Matos",
      "email": "jose.m@ua.pt",
      "lastVisit": 1609894701000,
      "type": "CLIENT"
    },
    "date": 1609894699000
  },
  "products": [
    {
      "product": {
        "id": 1716,
        "price": 10,
        "name": "Produto4",
        "description": "Descrição",
        "stock_current": 282,
        "stock_minimum": 5,
        "category": {
          "id": 1,
          "name": "Categoria1"
        }
      },
      "units": 71
    }
  ]
}
*/

const useStyles = makeStyles((theme) => ({
	root: {},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

const Results = ({ className, ...props }) => {
	const classes = useStyles();

	const [transactions, setTransactions] = useState([]);

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
	// Update list every second to always have last transactions
	useEffect(() => {
		updateTransactions();
		const loop = setInterval(() => {
			updateTransactions();
		}, 1000);
		return () => clearInterval(loop);
	}, [page, size]);

	async function updateTransactions() {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};
		let url =
			Url + "/api/admin/purchases/?page=" +
			page +
			"&size=" +
			size;
		const nif = new URLSearchParams(window.location.search).get("nif");
		if (nif != null) {
			url =
				Url + "/api/admin/purchases/" +
				nif +
				"?page=" +
				page +
				"&size=" +
				size;
		}
		const response = await fetch(url, requestOptions);
		const data = await response.json();

		// Update transactions
		setTransactions(data["transactions"]);
		setCount(data["totalItems"]);
	}

	return (
		<Card className={clsx(classes.root, className)}>
			<PerfectScrollbar>
				<Box minWidth={1050}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Total</TableCell>
								<TableCell>Products</TableCell>
								<TableCell>
									<TableSortLabel active direction="desc">
										Date
									</TableSortLabel>
								</TableCell>
								<TableCell>Customer</TableCell>
								<TableCell>Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{transactions.map((transaction) => (
								<TableRow
									hover
									key={transaction.transaction.id}
								>
									<TableCell>
										{transaction.total.toFixed(2)}€
									</TableCell>
									<TableCell>
										{transaction.products.length}
									</TableCell>
									<TableCell>
										{moment(
											transaction.transaction.date
										).format("DD/MM/YYYY, HH:mm:ss")}
									</TableCell>
									<TableCell>
										<Box alignItems="center" display="flex">
											<Avatar className={classes.avatar}>
												{getInitials(
													transaction.transaction
														.client.name
												)}
											</Avatar>
											<Typography
												color="textPrimary"
												variant="body1"
											>
												{
													transaction.transaction
														.client.name
												}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>
										<Bill transaction={transaction} />
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
	);
};

Results.propTypes = {
	className: PropTypes.string,
	transactions: PropTypes.array.isRequired,
};

export default Results;
