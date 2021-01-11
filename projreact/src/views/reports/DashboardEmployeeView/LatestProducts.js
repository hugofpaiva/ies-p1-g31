import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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

const LatestProducts = ({ className, latest_products, ...rest }) => {
  const classes = useStyles();

  let counter = 0;
  const products = latest_products.map(obj => {
    counter += 1;
    const name = Object.keys(obj)[0];
    return {
      'id': counter,
      'name': name,
      'updatedAt': moment(obj[name]).format('DD/MM/YYYY, h:mm:ss')
    }
  })

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Last Bought Products"
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
          to="/employee/products"
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
