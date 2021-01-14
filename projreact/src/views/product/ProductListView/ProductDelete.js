import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Url} from "src/ApiConsts";
import {
    XCircle,
} from "react-feather";

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [product] = React.useState(props.product);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        deleteProduct();
    }

    async function deleteProduct() {
        // Make request 
        console.log("DELETE");
        console.log(product);
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        const url = Url + '/api/admin/product/' + product.id;
        const response = await fetch(url, requestOptions);
        if (response.status === 200) {
            props.update();
            setOpen(false);
        } else {
            setError(true);
        }
    }

    return (
        <div>
            <Button 
                variant="contained" 
                onClick={handleClickOpen}
                style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                }}
            >
                <XCircle size="20" />
                <span >Delete</span>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete '{product.name}'?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This operation is irreversible!
          </DialogContentText>
                    {
                        error &&
                        <Typography
                            color="error"
                            display="inline"
                            variant="body2"
                        >
                            There was an error! :/ Please, try again.
                    </Typography>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Proceed
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}