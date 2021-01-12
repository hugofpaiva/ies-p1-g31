import React, { useState } from "react";
import { Box, Container, makeStyles, LinearProgress } from "@material-ui/core";
import Page from "src/components/Page";
import Results from "./Results";

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
	const [loading, setLoading] = useState(false);

	return (
		<Page className={classes.root} title="Customers">
			<Container maxWidth={false}>
				{loading ? (
					<Box style={{ marginTop: "20%" }}>
						<LinearProgress />
					</Box>
				) : (
					<div>
						<Box mt={3}>
							<Results
								loading={setLoading}
							/>
						</Box>
					</div>
				)}
			</Container>
		</Page>
	);
};

export default CustomerListView;
