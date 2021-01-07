import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Chip,
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

const Help = ({ notificationsArray, className, ...rest }) => {
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
      <CardHeader title="Help Needed notifications" />
      <Divider />
      <Box minWidth={800}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Customer
                </TableCell>
              <TableCell sortDirection="desc">
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
              <TableCell>
                Status
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map(notification => (
              <TableRow
                hover
                key={notification.key}
              >
                <TableCell>
                  {notification.nif}
                </TableCell>
                <TableCell>
                  {moment(notification.timestamp).format('DD/MM/YYYY, HH:mm:ss')}
                </TableCell>
                <TableCell>
                  <Chip
                    color="primary"
                    label={notification.state}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

Help.propTypes = {
  className: PropTypes.string
};

export default Help;
