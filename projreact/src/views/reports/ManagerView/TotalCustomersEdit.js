import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {
    TextField,
    Typography,
    Grid
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    const [maxCustomers, setMaxCustomers] = React.useState(0);

    useEffect(() => {
        setMaxCustomers(props.maxCustomers);
    }, [props.maxCustomers]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        updateValue();
    }

    async function updateValue() {
        // Remove error
        setError("");
        // Validate number
        if (maxCustomers <= 0) {
            setError("The number must be an integer greater than zero!");
            return null;
        }
        // Make request
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        const url = 'http://127.0.0.1:8080/api/admin/new-limit?limit=' + maxCustomers;
        const response = await fetch(url, requestOptions);
        if (response.status === 200) {
            // Close form  
            setOpen(false);
            // Update dashbard values
            props.update();
        } else {
            // Show error
            setError("There was an error! :/ Please, try again.");
        }
    }

    return (
        <Grid
            alignContent={"flex-end"}
        >
            <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
            >
                Change max customers
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Change max customers number
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill this form to edit the max number.
                    </DialogContentText>
                    {
                        error &&
                        <Typography
                            color="error"
                            display="inline"
                            variant="body2"
                        >
                            {error}
                        </Typography>
                    }
                    <TextField
                        autoFocus
                        margin="dense"
                        id="max"
                        label="Max number of customers in store"
                        type="number"
                        value={maxCustomers}
                        onChange={val => setMaxCustomers(val.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}