import React, { useState, useEffect } from 'react';
import {Url} from "src/ApiConsts";
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import LatestProducts from './LatestProducts';
import CurrentCostumers from './CurrentCostumers';
import CostumersInStore from './CostumersInStore';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import SalesByType from './SalesByType';
import TotalCustomersEdit from './TotalCustomersEdit';

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
  const [profit, setProfit] = useState(0);
  const [maxCustomers, setMaxCustomers] = useState(0);
  const [inStore, setInStore] = useState(0);
  const [sales, setSales] = useState([]);
  const [lastPersons, setLastPersons] = useState([]);
  const [lastProducts, setLastProducts] = useState([]);

  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  };

  // Fazer chamada à API para obter produtos
	useEffect(() => {
    updateValues();
    // Refresh the most dynamic every second
    const loop = setInterval(async function() {
      updateValues();
    }, 1000);
    return () => clearInterval(loop);
	}, []);

	async function updateValues() {
    // Update month profit
		let url = Url + "/api/admin/monthly_profit";
		let response = await fetch(url, requestOptions);
		let data = await response.json();
    setProfit(data['last_month_total']); 
    // Update costumers in store
		url = Url + "/api/work/num_persons_in_store";
		response = await fetch(url, requestOptions);
    data = await response.json();
    setInStore(data['persons_in_store']);
    // Update max customers in store
		url = "http://127.0.0.1:8080/api/work/num_limit";
		response = await fetch(url, requestOptions);
    data = await response.json();
    setMaxCustomers(data['limit_persons_in_store']);
    // Update sales by type
		url = Url + "/api/admin/monthly_sale_by_category";
		response = await fetch(url, requestOptions);
    data = await response.json();
    setSales(data);
    // Update last persons in store
    url = Url + "/api/work/last_persons_in_store";
		response = await fetch(url, requestOptions);
    data = await response.json();
    setLastPersons(data);
    // Update last bought products
    url = Url + "/api/work/last_bought_products";
		response = await fetch(url, requestOptions);
    data = await response.json();
    setLastProducts(data);
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
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <CostumersInStore value={inStore} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers value={maxCustomers} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit value={profit.toFixed(2)} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomersEdit 
              maxCustomers={maxCustomers} 
              update={updateValues} 
            />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <CurrentCostumers persons={lastPersons.slice(0,8)} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <SalesByType sales={sales} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestProducts productsList={lastProducts.slice(0,6)} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
