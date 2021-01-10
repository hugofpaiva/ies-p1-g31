import React from 'react';
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

let graphColors = [];

const SalesByType = ({ sales, className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  for(let i = graphColors.length; i < Object.keys(sales).length; i++) {
      graphColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
  }

  const salesList = Object.keys(sales).map((tag, index) => {
    return {
      'title': tag,
      'value': sales[tag],
      'color': graphColors[index]
    }
  });

  const data = {
    datasets: [
      {
        data: salesList.map(sale => sale['value']),
        backgroundColor: salesList.map(sale => sale['color']),
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: salesList.map(sale => sale['title'])
  };

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

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Sales by Product Type" />
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
          flexWrap="wrap"
          mt={2}
        >
          {salesList.map(({
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

SalesByType.propTypes = {
  className: PropTypes.string
};

export default SalesByType;
