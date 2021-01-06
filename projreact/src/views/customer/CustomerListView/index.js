import React, { useState, useEffect } from "react";
import { Box, Container, makeStyles, LinearProgress } from "@material-ui/core";
import axios from "axios";
import Page from "src/components/Page";
import Results from "./Results";
import Toolbar from "./Toolbar";
import data from "./data";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

const CustomerListView = () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [customers, setCustomers] = useState(data);

	useEffect(() => {
		setLoading(true);
		getCostumers();
	}, []);

	async function getCostumers() {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
		let url = "http://127.0.0.1:8080/api/admin/persons";
		const response = await fetch(url, requestOptions);
		const data = await response.json();
		console.log("GOT COSTUMERS");
		console.log(data);
		// Update categories
		// Only show clients
		setCustomers(data.filter(c => c.type=="CLIENT"));
		// Remove loading
		setLoading(false);
	}

	return (
		<Page className={classes.root} title="Customers">
			<Container maxWidth={false}>
				{loading || !customers ? (
					<Box style={{ marginTop: "20%" }}>
						<LinearProgress />
					</Box>
				) : (
					<div>
						<Box mt={3}>
							<Results customers={customers} />
						</Box>
					</div>
				)}
			</Container>
		</Page>
	);
};

export default CustomerListView;
