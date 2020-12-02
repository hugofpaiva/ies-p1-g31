import React, { useState } from 'react';
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

const data = [
  {
    id: uuid(),
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016406000,
    status: 'pending'
  },
  {
    id: uuid(),
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016405000,
    status: 'pending'
  },
  {
    id: uuid(),
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930200000,
    status: 'pending'
  },
  {
    id: uuid(),
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757210700,
    status: 'customer left'
  },
  {
    id: uuid(),
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670809000,
    status: 'resolved'
  },
  {
    id: uuid(),
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670803000,
    status: 'customer left'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Help = ({ className, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState(data);

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
              {notifications.map((notification) => (
                <TableRow
                  hover
                  key={notification.id}
                >

                  <TableCell>
                    {notification.customer.name}
                  </TableCell>
                  <TableCell>
                    {moment(notification.createdAt).format('DD/MM/YYYY, h:mm:ss')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={notification.status}
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
