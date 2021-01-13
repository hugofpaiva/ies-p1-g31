import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Box,
	Container,
	Grid,
	makeStyles,
	LinearProgress,
} from "@material-ui/core";
import Page from "src/components/Page";
import CustomerCard from "./CustomerCard";

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

const CustomerList = () => {
	const classes = useStyles();
	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(true);

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
		const loop = setInterval(function() {
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
		return () => clearInterval(loop);
	}, []);

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
										key={customer.id}
										item
										lg={3}
										md={4}
										xs={12}
									>
										<CustomerCard
											className={classes.customerCard}
											customer={customer}
										/>
									</Grid>
								))}
							</Grid>
						</Box>
					</div>
				)}
			</Container>
		</Page>
	);
};

export default CustomerList;
