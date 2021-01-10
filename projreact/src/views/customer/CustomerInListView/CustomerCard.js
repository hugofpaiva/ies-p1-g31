import React from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
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
import { withStyles } from "@material-ui/core/styles";
import ProductCard from "./ProductCard";

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

const DialogContent = withStyles((theme) => ({
	root: {
		maxHeight: "1000px",
		paddingBottom: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

const CustomerCard = ({ className, customer, ...rest }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [cart, setCart] = React.useState({
		'id': 0,
		'person': {
			'nif': 0,
			'name': 0,
			'email': 0,
			'lastVisit': 0,
			'type': ''
		},
		'products': []
	});

	const openCart = (customer) => {
		loadCart();
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function loadCart() {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
		let url = 'http://127.0.0.1:8080/api/admin/cart/' + customer.nif;
		const response = await fetch(url, requestOptions);
		const data = await response.json();
		setCart(data);
	}


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
						Entered at: {moment(customer.last_visit).format('DD/MM/YYYY, HH:mm:ss')}
					</Typography>
				</Box>
				<Grid container justify="center">
					<Button style={{backgroundColor: colors.common.white}} variant="contained" onClick={openCart}>
						<ShoppingCart className={classes.icon} size="20" />
						<span className={classes.title}>See Shopping Cart</span>
					</Button>
				</Grid>
				<Dialog
					onClose={handleClose}
					aria-labelledby="customized-dialog-title"
					open={open}
				>
					<DialogContent dividers>
						<Box>
							<Typography
								variant="h1"
								style={{ letterSpacing: "1px" }}
							>
								Cart
							</Typography>
						</Box>
						<Box mt={3}>
							<Grid container spacing={3}>
								{
									cart.products.length>0 
									? cart.products.map((p) => (
									<Grid
										item
										key={p.product.id}
										lg={12}
										md={12}
										xs={12}
									>
										<ProductCard
											className={classes.productCard}
											product={p.product}
										/>
									</Grid>
									)) 
									: <Typography>
										The cart is empty. :(
									</Typography>								}
							</Grid>
						</Box>
					</DialogContent>
					<DialogActions>
						<Button autoFocus onClick={handleClose} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</CardContent>
		</Card>
	);
};

CustomerCard.propTypes = {
	className: PropTypes.string,
	customer: PropTypes.object.isRequired,
};

export default CustomerCard;
