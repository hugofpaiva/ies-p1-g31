import React from "react";
import { Box, Container, makeStyles, Grid } from "@material-ui/core";
import Page from "src/components/Page";
import Notifications from "./Notifications";
import Password from "./Password";
import ProfileDetails from "./ProfileDetails";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

const SettingsView = (props) => {
	const classes = useStyles();

	return (
		<Page className={classes.root} title="Settings">
			<Container maxWidth="lg">
				<Box mt={3}>
					<ProfileDetails persona={props.persona} />
				</Box>
				<Box mt={3}>
					<Password />
				</Box>
				<Box mt={3}>
					<Notifications persona={props.persona} />
				</Box>
			</Container>
		</Page>
	);
};

export default SettingsView;
