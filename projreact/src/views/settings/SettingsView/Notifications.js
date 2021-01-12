import React, { useState, useEffect } from "react";
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

	const [notifications, setNotifications] = useState({
		'help': true,
		'stock': true,
		'full': true,
	})

	useEffect(() => {
		// Update notifications with user preferences on local storage
		setNotifications(JSON.parse(localStorage.getItem('notificationsPreferences')));
	}, []);

	const handleChange = (attr) => {
		setNotifications({...notifications, [attr]:!notifications[attr]});
	};

	const save = () => {
		// Update localstorage
		localStorage.setItem("notificationsPreferences", JSON.stringify(notifications));
		// Reload to apply changes
		window.location.reload();
	}

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

							{persona === "employee" &&
								<FormControlLabel
									control={<Checkbox checked={notifications.help} onChange={() => handleChange("help")} defaultChecked />}
									label="Help needed"
								/>
							}
							{persona === "admin" &&
								<Grid
									container="true"
									direction="column"
								>
									<FormControlLabel
										control={<Checkbox checked={notifications.full} onChange={() => handleChange("full")} defaultChecked />}
										label="Store is full"
									/>
									<FormControlLabel
										control={<Checkbox checked={notifications.stock} onChange={() => handleChange("stock")} defaultChecked />}
										label="Low stock"
									/>
								</Grid>
							}
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<Box display="flex" justifyContent="flex-end" p={2}>
					<Button color="primary" variant="contained" onClick={() => save()}>
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
