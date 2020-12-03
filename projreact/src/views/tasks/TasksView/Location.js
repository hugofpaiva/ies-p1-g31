import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
	makeStyles
} from '@material-ui/core';

import {
	Map as MapIcon,
} from "react-feather";

import ReceiptIcon from "@material-ui/icons/Receipt";

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

	const task = props.task;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				onClick={handleClickOpen}
				title="See location"
			>
				<MapIcon size="20" />
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
					Location
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-description"
						color="primary"
					>
						{task.place}
					</DialogContentText>
					<img src="/static/images/maps/store.png" />
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
