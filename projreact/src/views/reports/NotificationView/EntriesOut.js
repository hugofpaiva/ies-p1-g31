import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
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
    createdAt: 1555016400000,
    status: 'left'
  },
  {
    id: uuid(),
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'entered'
  },
  {
    id: uuid(),
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'entered'
  },
  {
    id: uuid(),
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'left'
  },
  {
    id: uuid(),
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'left'
  },
  {
    id: uuid(),
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'entered'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const EntriesOut = ({ className, ...rest }) => {
  const classes = useStyles();
  const [entriesout] = useState(data);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="People in/out Store notifications" />
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
              {entriesout.map((eout) => (
                <TableRow
                  hover
                  key={eout.id}
                >
                  <TableCell>
                    {eout.customer.name}
                  </TableCell>
                  <TableCell>
                    {moment(eout.createdAt).format('DD/MM/YYYY, HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={eout.status}
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

EntriesOut.propTypes = {
  className: PropTypes.string
};

export default EntriesOut;
