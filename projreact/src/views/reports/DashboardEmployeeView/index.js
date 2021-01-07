import React, { useState, useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CostumersInLine from './CostumersInLine';
import LatestProducts from './LatestProducts';
import HelpRequests from './HelpRequests';
import CostumersInStore from './CostumersInStore';
import TotalCustomers from './TotalCustomers';
import RequestsAttended from './RequestsAttended';
import RequestsStats from './RequestsStats';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [customers_in_store, set_customers_in_store] = useState(0);
  const [latest_products, set_latest_products] = useState([]);
  const [maxValue, set_max_value] = useState(5);
  const [todays_attended_requests, set_todays_attended_requests] = useState(0);

  // See the max number of people that can be inside the store
  useEffect(async() => {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
		};
		const response = await fetch('http://127.0.0.1:8080/api/work/max_persons', requestOptions);
		const data = await response.json();
		console.log("GOT MAX");
    console.log(data);
    set_max_value(data)
  }, []);

  // See how many people are inside the store
  useEffect(async() => {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
		};
		const response = await fetch('http://127.0.0.1:8080/api/work/num_persons_in_store', requestOptions);
		const data = await response.json();
		console.log("GOT DATA");
    console.log(data);
    set_customers_in_store(data['persons_in_store'])
  }, []);
  
  // See how many help requests have been attended
  useEffect(async() => {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
		};
		const response = await fetch('http://127.0.0.1:8080/api/work/todays_attended_requests', requestOptions);
		const data = await response.json();
		console.log("GOT TODAYS ATTENDED REQUESTS");
    console.log(data);
    set_todays_attended_requests(data)
  }, []);

  // See the latest bought products
  useEffect(async() => {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
    };
    
		const response = await fetch('http://127.0.0.1:8080/api/work/last_bought_products', requestOptions);
		const data = await response.json();
		console.log("GOT LATEST PRODUCTS");
    console.log(data);
    set_latest_products(data)
	}, []);

	

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            style={{height: '80%'}}
          >
            <CostumersInLine />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            style={{height: '80%'}}
          >
            <CostumersInStore persons_in_store = {customers_in_store}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            style={{height: '80%'}}
          >
            <TotalCustomers maxValue = {maxValue}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <RequestsAttended todays_attended_requests = {todays_attended_requests}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <HelpRequests />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <RequestsStats />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestProducts latest_products = {latest_products}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
