import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import {
    makeStyles
  } from '@material-ui/core';
  

import ReceiptIcon from "@material-ui/icons/Receipt";
import InfoIcon from "@material-ui/icons/Info";
import {
	Grid,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(1)
    },
    title: {
      marginRight: 'auto'
    },

  }));

export default function Bill(props) {
	const [open, setOpen] = React.useState(false);
	const [maxWidth, setMaxWidth] = React.useState("sm");
    const [fullWidth, setFullWidth] = React.useState(true);
    const classes = useStyles();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
            <Button
                      variant="contained"
                      onClick={handleClickOpen}	
										>
                      <ReceiptIcon className={classes.icon} size="20" />
						<span className={classes.title}>See details</span>
                    </Button>
			<Dialog
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{moment(props.transaction.transaction.date).format("DD/MM/YYYY H:M")}
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-description"
						color="primary"
					>
						Total: {props.transaction.total}€
					</DialogContentText>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>QTD</TableCell>
								<TableCell>Product</TableCell>
								{
									//<TableCell>VAT</TableCell>
								}
								<TableCell>Value</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.transaction.products.map((p) => (
								<TableRow>
									<TableCell>{1}</TableCell>
									<TableCell>{p.product.name}</TableCell>
									<TableCell>
										<Grid container="true" direction="row">
											{p.product.price}
											{p.product.price * 1 !=
												p.product.price && (
												<Grid
													style={{
														marginLeft: "auto",
													}}
												>
													<Tooltip
														title={`${p.product.price} per unit`}
													>
														<Typography
															color="textSecondary"
															variant="caption"
														>
															<InfoIcon />
														</Typography>
													</Tooltip>
												</Grid>
											)}
										</Grid>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
