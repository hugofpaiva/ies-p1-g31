import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
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
    // Load last notitications from API
    getLastNotifications();

    // Subscribe to socket for updates
    const socket = new SockJS('http://localhost:8080/api/ws');
    const stompClient = Stomp.over(socket);
    const headers = {};

    stompClient.connect(headers, () => {
      stompClient.subscribe('/topic/restock', function (messageOutput) {
        const not = JSON.parse(messageOutput.body);
        setNotifications(oldArray => {
          const newArray = [...oldArray, {
            ...not,
            "date": Date.now(),
          }];
          return newArray;
        })
      });
    });
  }, []);

  async function getLastNotifications() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = await fetch('http://127.0.0.1:8080/api/admin/notifications_restock', requestOptions);
    const data = await response.json();
    // Update value with notifications from server
    setNotifications(not => {
      const newNotifications = [...not];
      data['notifications'].forEach(notification => {
        newNotifications.push(notification);
      })
      // Return sorted version
      return newNotifications;
    });
  }

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
            {notifications.sort(not => -1*not['date']).slice(page * limit, page * limit + limit).map(stock => (
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
