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
		const apiUrl = "http://localhost:8080/api/persons/";
		axios.get(apiUrl).then((response) => {
			setCustomers(response.data);
			setLoading(false);
		});
	}, []);

	return (
		<Page className={classes.root} title="Customers">
			<Container maxWidth={false}>
				{loading || !customers ? (
					<Box style={{ marginTop: "20%" }}>
						<LinearProgress />
					</Box>
				) : (
					<div>
						<Toolbar />
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
