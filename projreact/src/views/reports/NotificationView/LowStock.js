import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
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
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const data = [
  {
    id: uuid(),
    product: 'NETGEAR Wi-Fi Range Extender EX3700',
    stock: 2,
    createdAt: 1555016400000,
  },
  {
    id: uuid(),
    product: 'PlayStation 4 Pro 1TB',
    stock: 3,
    createdAt: 1555016400000,
  },
  {
    id: uuid(),
    product: 'Sonos Play:1',
    stock: 1,
    createdAt: 1555016400000,
  },
  {
    id: uuid(),
    product: 'Monster Energy Zero Ultra, Sugar Free Energy Drink',
    stock: 2,
    createdAt: 1555016400000,
  },
  {
    id: uuid(),
    product: 'Silk Unsweetened Organic Soymilk',
    stock: 1,
    createdAt: 1555016400000,
  },
  {
    id: uuid(),
    product: 'Horizon Organic 1 % Low Fat Milk',
    stock: 4,
    createdAt: 1555016400000,
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LowStock = ({ className, ...rest }) => {
  const classes = useStyles();
  const [stock] = useState(data);

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
              {stock.map((stock) => (
                <TableRow
                  hover
                  key={stock.id}
                >
                  <TableCell>
                    {stock.product}
                  </TableCell>
                  <TableCell>
                  {moment(stock.createdAt).format('DD/MM/YYYY, h:mm:ss')}
                  </TableCell>
                  <TableCell>
                  {stock.stock}
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
