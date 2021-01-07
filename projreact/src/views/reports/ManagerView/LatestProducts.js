import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const LatestProducts = ({ productsList, className, ...rest }) => {
  const classes = useStyles();

  let counter = 0;
  const products = productsList.map(obj => {
    counter += 1;
    const name = Object.keys(obj)[0];
    return {
      'id': counter,
      'name': name,
      'updatedAt': moment(obj[name]).format('DD/MM/YYYY, h:mm:ss')
    }
  })
  console.log(productsList);
  console.log(products);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
            key={product.id}
          >
            <ListItemText
              primary={product.name}
              secondary={`Bought ${product.updatedAt}`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          component={RouterLink}
          to="/admin/products"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
