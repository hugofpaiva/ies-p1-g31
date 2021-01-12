import React, { useDebugValue } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const states = ['RESOLVED'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    async function updateState(task, value) {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
			body: JSON.stringify({id:task.id, nif:task.nif, type:task.type, state: value})
		};
		const response = await fetch('http://127.0.0.1:8080/api/work/notifications_help/' + task.id, requestOptions);
        const data = await response.json();
        return false
	}

    const handleListItemClick = (value) => {
        updateState(props.task,value)
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Update request status</DialogTitle>
            <List>
                {states.map((state) => (
                    <ListItem button onClick={() => handleListItemClick(state)} key={state}>
                        <ListItemText primary={state} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function ResolveRequest(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(states[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                title="Resolve help request"
            >
                <CheckCircleOutlineIcon size="20" />
            </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} task={props.task} />
        </div>
    );
}
