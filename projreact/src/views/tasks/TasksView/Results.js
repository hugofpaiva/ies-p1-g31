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
  makeStyles,
  Chip,
  Grid
} from '@material-ui/core';

import Location from './Location';
import ResolveRequest from './ResolveRequest';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, tasks, ...rest }) => {
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
                  Moment
                </TableCell>
                <TableCell>
                  Section
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Operations
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.slice(0, limit).map((task) => (
                <TableRow
                  hover
                  key={task.id}
                >
                  <TableCell>
                    {moment(task.createdAt).format('DD/MM/YYYY, h:mm:ss')}
                  </TableCell>
                  <TableCell>
                    {task.place}
                  </TableCell>
                  <TableCell>
                    {task.customer.name}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={task.status == "Pending" ? "primary" : "secondary"}
                      label={task.status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Grid
                        container="true"
                        direction="row"             
                    >
                      <Location task={task} />
                      <ResolveRequest task={task} />
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={tasks.length}
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
  tasks: PropTypes.array.isRequired
};

export default Results;
