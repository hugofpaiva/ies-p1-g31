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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    let p = null;
    if (props.edit) {
        p = props.product;
    } else {
        p = {
            "id": 0,
            "price": 0,
            "name": "",
            "description": "",
            "stock_current": 0,
            "stock_minimum": 0,
            "category": {
                "id": 1,
                "name": ""
            }
        }
    }
    const [product, setProduct] = React.useState(p);

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
        if (props.edit)
            console.log("UPDATE");
        else
            console.log("NEW PRODUCT");
        console.log(product);
        if (!product)
            return;
        const requestOptions = {
            method: props.edit ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(product)
        };
        const url = props.edit ? 'http://127.0.0.1:8080/api/admin/product/' + product.id : 'http://127.0.0.1:8080/api/admin/products';
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
            {
                props.edit ?
                    <Button variant="contained" onClick={handleClickOpen}>
                        <Edit size="20" />
                        <span>Edit</span>
                    </Button>
                    :
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleClickOpen}
                    >
                        Add product
                </Button>
            }
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {
                        props.edit ?
                            "Edit product"
                            : "Add product"
                    }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {
                            props.edit ?
                                "Fill this form to edit the product data."
                                : "Fill this form to add a new product"
                        }
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
                        type="number"
                        value={product.price}
                        onChange={val => setProduct({ ...product, price: val.target.value })}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="min_stock"
                        label="Minimum stock"
                        type="number"
                        value={product.stock_minimum}
                        onChange={val => setProduct({ ...product, stock_minimum: val.target.value })}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={product.category.id}
                            onChange={val => {
                                props.categories.forEach(cat => {
                                    if (cat.id === val.target.value)
                                        setProduct({ ...product, category: cat });
                                });
                            }}
                            fullWidth
                        >
                            {props.categories.map(cat => (
                                <MenuItem value={cat.id} index={0}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {
                            props.edit ?
                                "Edit"
                                : "Save"
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}