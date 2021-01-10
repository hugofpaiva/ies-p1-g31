import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LowStock = ({ notificationsArray, className, ...rest }) => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);

  // Initialize and update every time props change
  useEffect(() => {
    setNotifications(notificationsArray.sort(not => not['timestamp']).slice(0, 10));
  }, [notificationsArray]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Low Stock notifications"/>
      <Divider />

        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{width: '50%'}}>
                  Product
                </TableCell>
                
                <TableCell sortDirection="desc" style={{width: '25%'}}>
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell style={{width: '25%'}}>
                  Stock now
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.map(stock => (
                <TableRow
                  hover
                  key={stock.key}
                >
                  <TableCell>
                    {stock.idProduct}
                  </TableCell>
                  <TableCell>
                    {moment(stock.timestam).format('DD/MM/YYYY, HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    {stock.qty}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

  
    </Card>
  );
};

LowStock.propTypes = {
  className: PropTypes.string
};

export default LowStock;
