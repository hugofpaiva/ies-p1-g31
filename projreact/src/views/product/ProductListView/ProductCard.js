import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { colors } from '@material-ui/core';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import {
  RefreshCcw
} from "react-feather";
import ProductEdit from './ProductEdit';
import ProductDelete from './ProductDelete';
import ProductRestock from './ProductRestock';

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
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  description: {
    height: '100px',
    overflow: 'hidden',
  }
}));

const ProductCard = ({categories, update, persona, className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.name} | {product.price} €
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
          className={classes.description}
        >
          {product.description}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-around"
          mb={1}>
          {
            persona === "admin" &&
            <Box
              display="flex"
              justifyContent="space-around"
              mb={1}>
              <ProductEdit 
                product={product} 
                update={update} 
                categories={categories}
                edit={true}
              />
              <ProductDelete
                product={product} 
                update={update} 
              />
              <ProductRestock 
                product={product} 
                update={update} 
              />
            </Box>
          }
          {
            persona === "employee" &&
            <Button color={colors.common.yellow} variant="contained">
              <RefreshCcw className={classes.icon} size="20" />
              <span className={classes.title}>Restock</span>
            </Button>
          }
        </Box>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {product.category.name}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {product.stock_current}
              {' '}
              in Stock
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
