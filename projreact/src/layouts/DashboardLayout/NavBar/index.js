import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
	Avatar,
	Box,
	Divider,
	Drawer,
	Hidden,
	List,
	Typography,
	makeStyles,
} from "@material-ui/core";
import NavItem from "./NavItem";
import getInitials from "src/utils/getInitials";

import personas from '../data';

const useStyles = makeStyles((theme) => ({
	mobileDrawer: {
		width: 256,
	},
	desktopDrawer: {
		width: 256,
		top: 64,
		height: "calc(100% - 64px)",
	},
	avatar: {
		cursor: "pointer",
		backgroundColor: theme.palette.primary.main,
		width: 64,
		height: 64,
	},
}));

const NavBar = ({ onMobileClose, openMobile, persona }) => {
	const classes = useStyles();
	const location = useLocation();

	// Define user based on persona passed as props
	const user = personas[persona];

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose();
		}
		// eslint-disable-next-line
	}, [location.pathname]);

	const content = (
		<Box height="100%" display="flex" flexDirection="column">
			<Box
				alignItems="center"
				display="flex"
				flexDirection="column"
				p={2}
			>
				<Avatar className={classes.avatar}>
				</Avatar>

				<Typography
					className={classes.name}
					color="textPrimary"
					variant="h5"
				>
					{persona == "admin" && "Manager"}
					{persona == "employee" && "Employee"}
				</Typography>
				<Typography color="textSecondary" variant="body2">
				</Typography>
			</Box>
			<Divider />
			<Box p={2}>
				<List>
					{user.menu.map((item) => (
						<NavItem
							href={item.href}
							key={item.title}
							title={item.title}
							icon={item.icon}
						/>
					))}
				</List>
			</Box>
			<Box flexGrow={1} />
		</Box>
	);

	return (
		<>
			<Hidden lgUp>
				<Drawer
					anchor="left"
					classes={{ paper: classes.mobileDrawer }}
					onClose={onMobileClose}
					open={openMobile}
					variant="temporary"
				>
					{content}
				</Drawer>
			</Hidden>
			<Hidden mdDown>
				<Drawer
					anchor="left"
					classes={{ paper: classes.desktopDrawer }}
					open
					variant="persistent"
				>
					{content}
				</Drawer>
			</Hidden>
		</>
	);
};

NavBar.propTypes = {
	onMobileClose: PropTypes.func,
	openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
	onMobileClose: () => {},
	openMobile: false,
};

export default NavBar;
