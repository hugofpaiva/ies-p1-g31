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
  TablePagination,
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

  // Pagination stuff
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  // /Pagination stuff

  // Initialize and update every time props change
  useEffect(() => {
    setNotifications(notificationsArray.sort(not => not['timestamp']));
  }, [notificationsArray]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Low Stock notifications" />
      <Divider />

      <Box minWidth={800}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50%' }}>
                Product
                </TableCell>

              <TableCell sortDirection="desc" style={{ width: '25%' }}>
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
              <TableCell style={{ width: '25%' }}>
                Stock now
                </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.slice(page * limit, page * limit + limit).map(stock => (
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
        <TablePagination
          component="div"
          count={notifications.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10]}
        />
      </Box>


    </Card>
  );
};

LowStock.propTypes = {
  className: PropTypes.string
};

export default LowStock;
