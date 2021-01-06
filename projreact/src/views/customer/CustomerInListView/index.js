import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Box,
	Container,
	Grid,
	makeStyles,
	LinearProgress,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import CustomerCard from "./CustomerCard";
import { withStyles } from "@material-ui/core/styles";
import ProductCard from "./ProductCard";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	customerCard: {
		height: "100%",
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

const DialogContent = withStyles((theme) => ({
	root: {
		maxHeight: "1000px",
		paddingBottom: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

const CustomerList = () => {
	const classes = useStyles();
	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchName, setSearchName] = useState("");
	const [noOfPages, setnoOfPages] = useState(3);
	const [products, setProducts] = useState([]);
	const itemsPerPage = 12;
	const [page, setPage] = React.useState(1);

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:8080/api/work/persons_in_store/",{
				headers: {
				  'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			  })
			.then((response) => {
				// Sort by enter time
				setCustomers(response.data.sort((a,b) => new Date(a['last_visit']) - new Date(b['last_visit'])));
				setLoading(false);
			});
		setInterval(function() {
			axios
				.get("http://localhost:8080/api/work/persons_in_store/", {
					headers: {
					  'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				  })
				.then((response) => {
					// Sort by enter time
					setCustomers(response.data.sort((a,b) => new Date(a['last_visit']) - new Date(b['last_visit'])));
				});
		}, 1000);
	}, []);

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Page className={classes.root} title="Customers in Store">
			<Container maxWidth={false}>
				{loading || !customers ? (
					<Box style={{ marginTop: "20%" }}>
						<LinearProgress />
					</Box>
				) : (
					<div>
						<Box mt={3}>
							<Grid container spacing={3}>
								{customers.map((customer) => (
									<Grid
										item
										key={customer.id}
										lg={3}
										md={4}
										xs={12}
									>
										<CustomerCard
											className={classes.customerCard}
											customer={customer}
											onnclick={handleClickOpen}
										/>
									</Grid>
								))}
							</Grid>
						</Box>
					</div>
				)}
			</Container>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogContent dividers>
					<Box>
						<Typography
							variant="h1"
							style={{ letterSpacing: "1px" }}
						>
							Cart
						</Typography>
					</Box>
					<Box mt={3}>
						<Grid container spacing={3}>
							{products.map((product) => (
								<Grid
									item
									key={product.id}
									lg={12}
									md={12}
									xs={12}
								>
									<ProductCard
										className={classes.productCard}
										product={product}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</Page>
	);
};

export default CustomerList;
