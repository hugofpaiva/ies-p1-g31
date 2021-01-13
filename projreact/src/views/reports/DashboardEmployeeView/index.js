import React, { useState, useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
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
  const [maxValue, set_max_value] = useState(10);
  const [todays_attended_requests, set_todays_attended_requests] = useState(0);
  const [waiting_for_help, set_waiting_for_help] = useState([])
  // Fazer chamada à API para obter produtos
	useEffect(() => {
    const loop = updateValues();
    return () => clearInterval(loop);
	}, []);

	async function updateValues() {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
    // Update costumers in store
		let url = "http://127.0.0.1:8080/api/work/num_persons_in_store";
		let response = await fetch(url, requestOptions);
    let data = await response.json();
    set_customers_in_store(data['persons_in_store']);

    // Update max numb of people
    response = await fetch('http://127.0.0.1:8080/api/work/max_persons', requestOptions);
		data = await response.json();
		console.log("GOT MAX");
    console.log(data);
    set_max_value(data)

    // Update number of attended people
		url = "http://127.0.0.1:8080/api/work/todays_attended_requests";
		response = await fetch(url, requestOptions);
    data = await response.json();
    set_todays_attended_requests(data);

    // Update last bought products
    url = "http://127.0.0.1:8080/api/work/last_bought_products";
		response = await fetch(url, requestOptions);
    data = await response.json();
    set_latest_products(data);

    // Update persons waiting for help
    url = "http://127.0.0.1:8080/api/work/notifications_help_waiting";
		response = await fetch(url, requestOptions);
    data = await response.json();
    set_waiting_for_help(data["notifications"]);


    // Refresh the most dynamic every second
    return setInterval(async function() {
      // Update costumers in store
      url = "http://127.0.0.1:8080/api/work/num_persons_in_store";
      response = await fetch(url, requestOptions);
      data = await response.json();
      set_customers_in_store(data['persons_in_store']);
      // Update last bought products
      url = "http://127.0.0.1:8080/api/work/last_bought_products";
      response = await fetch(url, requestOptions);
      data = await response.json();
      set_latest_products(data);
      // Update number of attended people
      url = "http://127.0.0.1:8080/api/work/todays_attended_requests";
      response = await fetch(url, requestOptions);
      data = await response.json();
      set_todays_attended_requests(data);
      // Update persons waiting for help
      url = "http://127.0.0.1:8080/api/work/notifications_help_waiting";
      response = await fetch(url, requestOptions);
      data = await response.json();
      set_waiting_for_help(data["notifications"]);
    }, 1000);

  }
 
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
            lg={4}
            sm={6}
            xl={3}
            xs={12}
            style={{height: '80%'}}
          >
            <CostumersInStore persons_in_store = {customers_in_store}/>
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
            style={{height: '80%'}}
          >
            <TotalCustomers maxValue = {maxValue}/>
          </Grid>
          <Grid
            item
            lg={4}
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
            <HelpRequests waiting_for_help = {waiting_for_help.slice(0,6)}/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <RequestsStats/>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestProducts latest_products = {latest_products.slice(0,6)}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
