import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { Button, colors } from "@material-ui/core";
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Typography,
	makeStyles,
	Grid,
} from "@material-ui/core";
import getInitials from "src/utils/getInitials";
import { ShoppingCart } from "react-feather";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.palette.primary.main,
	},
	icon: {
		marginRight: theme.spacing(1),
	},
	title: {
		marginRight: "auto",
	},
	statsItem: {
		alignItems: "center",
		display: "flex",
	},
	statsIcon: {
		marginRight: theme.spacing(1),
	},
	typo: {
		color: colors.common.white,
	},
}));

const CustomerCard = ({ className, customer, onnclick, ...rest }) => {
	const classes = useStyles();

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardContent>
				<Box display="flex" justifyContent="center" mb={1}>
					<Avatar alt="Customer">{getInitials(customer.name)}</Avatar>
				</Box>
				<Typography
					align="center"
					className={classes.typo}
					gutterBottom
					variant="h3"
				>
					{customer.name}
				</Typography>
				<Box display="flex" justifyContent="center" mb={1}>
					<Typography
						align="center"
						className={classes.typo}
						gutterBottom
						variant="h6"
					>
						Entered at: {moment(customer.pushed_at).format('DD/MM/YYYY, h:mm:ss')}
					</Typography>
				</Box>
				<Grid container justify="center">
					<Button color={colors.common.white} variant="contained" onClick={onnclick}>
						<ShoppingCart className={classes.icon} size="20" />
						<span className={classes.title}>See Shopping Cart</span>
					</Button>
				</Grid>
			</CardContent>
		</Card>
	);
};

CustomerCard.propTypes = {
	className: PropTypes.string,
	customer: PropTypes.object.isRequired,
};

export default CustomerCard;
