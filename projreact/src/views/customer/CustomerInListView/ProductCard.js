import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  const subtotal = useState((parseFloat(product.quantity) * parseFloat(product.price)).toFixed(2))
  function sendData(){
    this.props.parentCallback(subtotal);
  }
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent style={{display:'flex'}}>
        <Box style={{height: "100%", width: "30%"}}> 
          <Avatar
            alt="Product"
            src={product.media}
            variant="rounded"
            display="inline"
            style={{height:"auto", width: "100%"}}
          />
        </Box>
        <Box style={{width: "80%", verticalAlign: "center"}}>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
            style={{marginLeft: '8%', letterSpacing: '0.8px', verticalAlign: "center"}}
          >
            {product.title}
          </Typography>
          <Typography style={{display: "block", marginLeft: '8%'}}>
          {product.description}
          </Typography>
        </Box>
        <Box>
          <Typography
            gutterBottom
            style={{marginLeft: '8%', position:'relative', verticalAlign: "bottom", fontSize: "160%", fontColor: "#3f51b5"}}
            
          >
            {product.price}€
          </Typography>

        </Box>
        
      </CardContent>
      <Divider />
      <Box p={1.4}>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="h4"
            >
              Quantity:
            </Typography>
            <Typography color="textSecondary" variant="h4" style={{marginLeft: '5%'}}>
                {product.quantity}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
            style={{marginRight: '1%'}}
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="h4"
            >
              Subtotal: 
            </Typography>
            <Typography className="subtotal" color="textSecondary" variant="h4" style={{marginLeft: '5%'}}>
                {subtotal}
                {sendData}
                €
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
