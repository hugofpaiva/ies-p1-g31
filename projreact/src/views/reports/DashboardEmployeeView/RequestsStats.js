import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const RequestsStats = ({ className, stats,...rest }) => {
  const classes = useStyles();
  const theme = useTheme();


  const [data, updateData] = useState({
    datasets: [
      {
        data: [91, 7, 2],
        backgroundColor: [
          colors.indigo[500],
          colors.orange[600],
          colors.red[600]          
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Resolved', 'Pending', 'Customer Left']
  });

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const [devices, updateDevices] = useState([
    {
      title: 'Resolved',
      value: 0,
      color: colors.indigo[500]
    },
    {
      title: 'Pending',
      value: 0,
      color: colors.orange[600]
    },
    {
      title: 'Customer Left',
      value: 0,
      color: colors.red[600]
    }
  ]);

  useEffect(() => {
    async function fetchData() {

      const requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      };
      const response = await fetch('http://127.0.0.1:8080/api/work/monthly_help_requests_stats', requestOptions);
      const new_data = await response.json();
      console.log("GOT STATS DATA");
      console.log(new_data);
      updateData({
        datasets: [
          {
            data: [new_data['RESOLVED'], new_data['PENDING'], new_data['CUSTOMER_LEFT']],
            backgroundColor: [
              colors.indigo[500],
              colors.orange[600],
              colors.red[600]          
            ],
            borderWidth: 8,
            borderColor: colors.common.white,
            hoverBorderColor: colors.common.white
          }
        ],
        labels: ['Resolved', 'Pending', 'Customer Left']
      });
      updateDevices([
        {
          title: 'Resolved',
          value: new_data['RESOLVED'],
          color: colors.indigo[500]
        },
        {
          title: 'Pending',
          value: new_data['PENDING'],
          color: colors.orange[600]
        },
        {
          title: 'Client Left',
          value: new_data['CUSTOMER_LEFT'],
          color: colors.red[600]
        }
      ]);
    }
    fetchData();
  }, []);
  
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Help requests stats" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

RequestsStats.propTypes = {
  className: PropTypes.string
};

export default RequestsStats;
