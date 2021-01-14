import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {Url} from "src/ApiConsts";
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

const LowStock = ({ className, ...rest }) => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);

  // Pagination stuff
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(0);
  const handleLimitChange = (event) => {
    setSize(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  // -- Pagination stuff

  // Initialize and update every time props change
  useEffect(() => {
    // Load last notitications from API
    getLastNotifications();

    // Subscribe to socket for updates
    const socket = new SockJS(Url + '/api/ws');
    const stompClient = Stomp.over(socket);
    const headers = {};

    stompClient.connect(headers, () => {
      stompClient.subscribe('/topic/restock', function (messageOutput) {
        const not = JSON.parse(messageOutput.body);
        // Only add notifications on first page
        if (page == 0) {
          setNotifications((oldArray) => [not, ...oldArray.slice(0, size - 1)]);
        }
        setCount(lastCount => lastCount + 1);
      });
    });

    return () => stompClient && stompClient.disconnect();
  }, [page, size]);

  async function getLastNotifications() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };
    const url = Url + "/api/admin/notifications_restock?page=" + page + "&size=" + size;
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    // Update value with notifications from server
    setNotifications(data["notifications"]);
    // Update count
    setCount(data["totalItems"]);
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Low Stock Notifications" />
      <Divider />

      <Box minWidth={500}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '30%' }}>
                Product ID
                </TableCell>

              <TableCell style={{ width: '40%' }}>
                <TableSortLabel
                  active
                  direction="desc"
                >
                  Date
                    </TableSortLabel>
              </TableCell>
              <TableCell style={{ width: '30%' }}>
                Stock at moment
                </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map(stock => (
              <TableRow
                hover
                key={stock.id}
              >
                <TableCell>
                  {stock.idProduct}
                </TableCell>
                <TableCell>
                  {moment(stock.date).format('DD/MM/YYYY, HH:mm:ss')}
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
          count={count}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={size}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>


    </Card>
  );
};

LowStock.propTypes = {
  className: PropTypes.string
};

export default LowStock;
