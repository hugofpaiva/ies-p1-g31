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
    Edit
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
    const [error, setError] = React.useState(false);
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
        // Make request 
        console.log("UPDATE");
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
        if (response.status == 200) {
            props.update();
            setOpen(false);
        } else {
            setError(true);
        }
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                <Edit size="20" />
                <span>Edit</span>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill this form to edit the product data.
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={product.name}
                        onChange={val => setProduct({ ...product, name: val.target.value })}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        value={product.description}
                        onChange={val => setProduct({ ...product, description: val.target.value })}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        type="text"
                        value={product.price}
                        onChange={val => setProduct({ ...product, price: val.target.value })}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Edit
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}