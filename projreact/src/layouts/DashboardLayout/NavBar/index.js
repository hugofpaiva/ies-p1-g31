import React, { useEffect } from "react";
import {  useLocation } from "react-router-dom";
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
import {
	BarChart as BarChartIcon,
	Settings as SettingsIcon,
	ShoppingBag as CustomersInIcon,
	Package as ShoppingBagIcon,
	Bell as NotificationsIcon,
	Users as UsersIcon,
	DollarSign as LatestOrders,
} from "react-feather";
import NavItem from "./NavItem";
import getInitials from "src/utils/getInitials";

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
const user = {
	avatar: "/static/images/avatars/avatar_6.png",
	jobTitle: "Administrator",
	name: "Katarina Smith",
};

const items = [
	{
		href: "/admin/",
		icon: BarChartIcon,
		title: "Dashboard",
	},
	{
		href: "/admin/customers/",
		icon: UsersIcon,
		title: "Customers",
	},
	{
		href: "/admin/customers/in_store",
		icon: CustomersInIcon,
		title: "Customers in Store",
	},
	{
		href: "/admin/orders/",
		icon: LatestOrders,
		title: "Latest Purchases",
	},
	{
		href: "/admin/products/",
		icon: ShoppingBagIcon,
		title: "Products",
	},
	{
		href: "/admin/notifications/",
		icon: NotificationsIcon,
		title: "Notifications",
	},
	{
		href: "/admin/settings/",
		icon: SettingsIcon,
		title: "Settings",
	},
];

const NavBar = ({ onMobileClose, openMobile }) => {
	const classes = useStyles();
	const location = useLocation();

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
					{getInitials(user.name)}
				</Avatar>

				<Typography
					className={classes.name}
					color="textPrimary"
					variant="h5"
				>
					{user.name}
				</Typography>
				<Typography color="textSecondary" variant="body2">
					{user.jobTitle}
				</Typography>
			</Box>
			<Divider />
			<Box p={2}>
				<List>
					{items.map((item) => (
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
