import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
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
  const [notifications, setNotifications] = useState([]);

  // Initialize and update every time props change

  useEffect(() => {
    // Load last notitications from API
    getLastNotifications();

    // Subscribe to socket for updates
    const socket = new SockJS('http://localhost:8080/api/ws');
    const stompClient = Stomp.over(socket);
    const headers = {};

    stompClient.connect(headers, () => {
      stompClient.subscribe('/topic/enter_store', function (messageOutput) {
        const not = JSON.parse(messageOutput.body);
        setNotifications(oldArray => {
          const newArray = [...oldArray, {
            ...not,
            "date": Date.now(),
          }];
          return newArray.sort(not => not['date']);
        })
      });
      stompClient.subscribe('/topic/exit_store', function (messageOutput) {
        const not = JSON.parse(messageOutput.body);
        setNotifications(oldArray => {
          const newArray = [...oldArray, {
            ...not,
            "date": Date.now(),
          }];
          return newArray.sort(not => not['date']);
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
    const response = await fetch('http://127.0.0.1:8080/api/admin/notifications_entered_left', requestOptions);
    const data = await response.json();
    // Update value with notifications from server
    setNotifications(not => {
      const newNotifications = [...not];
      data['notifications'].forEach(notification => {
        newNotifications.push(notification);
      })
      // Return sorted version
      return newNotifications.sort(not => not['date']);
    });
  }

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
            {notifications.map(notification => (
              <TableRow
                hover
                key={notification.id}
              >
                <TableCell>
                  {notification.nif}
                </TableCell>
                <TableCell>
                  {moment(notification.date).format('DD/MM/YYYY, HH:mm:ss')}
                </TableCell>
                <TableCell>
                  <Chip
                    color="primary"
                    label={
                      (notification.type == "ENTERED_STORE") ? "Entered Store" : "Exited Store"
                    }
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
