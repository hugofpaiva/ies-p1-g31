import React from 'react';
import Button from '@material-ui/core/Button';
import { 
    TextField,
    Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
    RefreshCcw
} from "react-feather";

/*
{
    "id": 1170,
    "price": 10,
    "name": "Produto9",
    "description": "Descrição",
    "stock_current": 0,
    "stock_minimum": 5,
    "category": {
        "id": 4,
        "name": "Categoria4"
    }
}
*/

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [product, setProduct] = React.useState(props.product);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        updateProduct();
    }

    async function updateProduct() {
        if (product.stock_current <= props.product.stock_current) {
            setError("Stock must be greater than previuos!");
            return;
        }
        // Make request 
        console.log("RESTOCK");
        console.log(product);
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(product)
        };
        const url = 'http://127.0.0.1:8080/api/admin/product/' + product.id;
        const response = await fetch(url, requestOptions);
        if (response.status === 200) {
            props.update();
            setError(null);
            setOpen(false);
        } else {
            setError("There was an error! :/ Please, try again.");
        }
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                <RefreshCcw size="20" />
                <span>Restock</span>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the quantity to restock the product.
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
                        id="stock"
                        label="Current stock"
                        type="number"
                        value={product.stock_current}
                        onChange={val => setProduct({ ...product, stock_current: val.target.value })}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Restock
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}