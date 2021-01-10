import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

import menuAuthority from '../menu';

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
	const [user, setUser] = useState(null);
	const [menu, setMenu] = useState([]);

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose();
		}
		// eslint-disable-next-line
		// Get user data
		loadUser();
	}, [location.pathname]);

	async function loadUser() {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
		const response = await fetch('http://127.0.0.1:8080/api/work/person/', requestOptions);
		// If bad response, log user out
		if (response.status != 200) {
			localStorage.removeItem("token");
			window.location.href = "/";
		}
		const data = await response.json();
		setUser(data);
		setMenu(menuAuthority[data['type']]);
	}

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
					{ user && user.name }
				</Typography>
				<Typography color="textSecondary" variant="body2">
					{ user && (user.type[0].toUpperCase() + user.type.substring(1).toLowerCase()) }
				</Typography>
			</Box>
			<Divider />
			<Box p={2}>
				<List>
					{menu.map((item) => (
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
	onMobileClose: () => { },
	openMobile: false,
};

export default NavBar;
