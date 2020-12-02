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

const data = [
  {
    id: uuid(),
    name: 'Horizon Organic 1 % Low Fat Milk',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81hRExAE9OL._SX679_PIbundle-18,TopRight,0,0_SX679SY385SH20_.jpg',
    updatedAt: moment().subtract(2, 'minutes')
  },
  {
    id: uuid(),
    name: 'Silk Unsweetened Organic Soymilk',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/91GOVhS2uVL._SX679_.jpg',
    updatedAt: moment().subtract(2, 'minutes')
  },
  {
    id: uuid(),
    name: 'Panasonic LUMIX FZ80 4K Digital Camera',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/917LEZ%2Bit3L._AC_SX679_.jpg',
    updatedAt: moment().subtract(3, 'minutes')
  },
  {
    id: uuid(),
    name: 'Monster Energy Zero Ultra, Sugar Free Energy Drink',
    imageUrl: 'https://m.media-amazon.com/images/I/913KMH1cDKL._AC_UL320_.jpg',
    updatedAt: moment().subtract(5, 'minutes')
  },
  {
    id: uuid(),
    name: 'Reign Total Body Fuel, Sour Apple, Fitness & Performance',
    imageUrl: 'https://m.media-amazon.com/images/I/81xADoTxjFL._AC_UL320_.jpg',
    updatedAt: moment().subtract(9, 'minutes')
  }
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [products] = useState(data);

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
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={product.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Bought ${product.updatedAt.fromNow()}`}
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
