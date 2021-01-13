import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
	Map as MapIcon,
} from "react-feather";

export default function Bill(props) {
	const [open, setOpen] = React.useState(false);
	const [maxWidth] = React.useState("sm");
	const [fullWidth] = React.useState(true);

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
					<img alt="Store" src="/static/images/maps/store.png" />
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
