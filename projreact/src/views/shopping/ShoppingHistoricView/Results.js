import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import Bill from './Bill';

/*
{
  "nproducts": 1,
  "total": 710,
  "transaction": {
    "id": 4,
    "client": {
      "nif": 630114163,
      "name": "José Matos",
      "email": "jose.m@ua.pt",
      "lastVisit": 1609894701000,
      "type": "CLIENT"
    },
    "date": 1609894699000
  },
  "products": [
    {
      "product": {
        "id": 1716,
        "price": 10,
        "name": "Produto4",
        "description": "Descrição",
        "stock_current": 282,
        "stock_minimum": 5,
        "category": {
          "id": 1,
          "name": "Categoria1"
        }
      },
      "units": 71
    }
  ]
}
*/


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, transactions, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Total
                </TableCell>
                <TableCell>
                  Products
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell>
                  Operations
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.slice(page*limit, page*limit+limit).map((transaction) => (
                <TableRow
                  hover
                  key={transaction.transaction.id}
                >
                  <TableCell>
                    {transaction.total}€
                  </TableCell>
                  <TableCell>
                    {transaction.products.length}
                  </TableCell>
                  <TableCell>
                    {moment(transaction.transaction.date).format('DD/MM/YYYY, h:mm:ss')}
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        
                      >
                        {getInitials(transaction.transaction.client.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {transaction.transaction.client.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Bill transaction={transaction} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={transactions.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  transactions: PropTypes.array.isRequired
};

export default Results;
