import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

import StoreIcon from '@material-ui/icons/Store';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Store = (props, { className, ...rest }) => {
  const classes = useStyles();
  const [user, setValues] = useState(props.data);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <StoreIcon 
            fontSize="large"
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.store}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Change favourite store
        </Button>
      </CardActions>
    </Card>
  );
};

Store.propTypes = {
  className: PropTypes.string
};

export default Store;
