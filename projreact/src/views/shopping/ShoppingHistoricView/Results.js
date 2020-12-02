import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
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


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, shoppings, ...rest }) => {
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
                  Store
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Operations
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shoppings.slice(0, limit).map((shopping) => (
                <TableRow
                  hover
                  key={shopping.id}
                >
                  <TableCell>
                    {shopping.bill.total}€
                  </TableCell>
                  <TableCell>
                    {shopping.bill.products.length}
                  </TableCell>
                  <TableCell>
                    {moment(shopping.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={shopping.avatarUrl}
                      >
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {shopping.store}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${shopping.address.city}, ${shopping.address.state}, ${shopping.address.country}`}
                  </TableCell>
                  <TableCell>
                    <Bill shopping={shopping} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={shoppings.length}
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
  shoppings: PropTypes.array.isRequired
};

export default Results;
