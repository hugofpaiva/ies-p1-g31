import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
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

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const HelpRequests = ({ className, waiting_for_help, ...rest }) => {
  const classes = useStyles();


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
              {waiting_for_help.map((person) => (
                  <TableRow
                    hover
                    key={person.id}
                  >
                    <TableCell>
                      {moment(person.date).format('DD/MM/YYYY, h:mm:ss')}
                    </TableCell>
                    <TableCell>
                      {person.nif}
                    </TableCell>
                  </TableRow>
              )
              )}
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
