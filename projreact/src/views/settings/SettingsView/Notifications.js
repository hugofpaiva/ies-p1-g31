import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	Typography,
	makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
	root: {},
	item: {
		display: "flex",
		flexDirection: "column",
	},
});

const Notifications = ({ persona, className, ...rest }) => {
	const classes = useStyles();

	return (
		<form className={clsx(classes.root, className)} {...rest}>
			<Card>
				<CardHeader
					subheader="Manage the notifications"
					title="Notifications"
				/>
				<Divider />
				<CardContent>
					<Grid container spacing={6} wrap="wrap">
						<Grid
							className={classes.item}
							item
							md={4}
							sm={6}
							xs={12}
						>
							<Typography
								color="textPrimary"
								gutterBottom
								variant="h6"
							>
								Notifications
							</Typography>

							{ persona=="employee" &&
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label="Help needed"
								/>
							}
							{ persona=="admin" &&
								<Grid
									container="true"
									direction="column"
								>
									<FormControlLabel
										control={<Checkbox defaultChecked />}
										label="Store is full"
									/>
									<FormControlLabel
										control={<Checkbox defaultChecked />}
										label="Low stock"
									/>
								</Grid>
							}
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<Box display="flex" justifyContent="flex-end" p={2}>
					<Button color="primary" variant="contained">
						Save
					</Button>
				</Box>
			</Card>
		</form>
	);
};

Notifications.propTypes = {
	className: PropTypes.string,
};

export default Notifications;
