import React, { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
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

import data from './data';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const HelpRequests = ({ className, ...rest }) => {
  const classes = useStyles();
  const [tasks, updateTasks] = useState([]);

  useEffect(async() => {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
    };
    
		const response = await fetch('http://127.0.0.1:8080/api/work/notifications_help', requestOptions);
		const data = await response.json();
		console.log("GOT DATA");
    console.log(data);
    updateTasks(data["notifications"])
	}, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Clients waiting for help" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Moment
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Client
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                if (task.state == "Pending") {
                  return (
                    <TableRow
                      hover
                      key={task.id}
                    >
                      <TableCell>
                        {moment(task.date_ts).format('DD/MM/YYYY, h:mm:ss')}
                      </TableCell>
                      <TableCell>
                        {task.nif}
                      </TableCell>
                    </TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          component={RouterLink}
          to="/employee/help/"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

HelpRequests.propTypes = {
  className: PropTypes.string
};

export default HelpRequests;
