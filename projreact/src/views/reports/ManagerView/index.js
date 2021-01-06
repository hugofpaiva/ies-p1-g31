import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CostumersInLine from './CostumersInLine';
import LatestProducts from './LatestProducts';
import CurrentCostumers from './CurrentCostumers';
import CostumersInStore from './CostumersInStore';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import SalesByType from './SalesByType';

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
  const [inLine, setInLine] = useState(0);

  // Fazer chamada à API para obter produtos
	useEffect(async() => {
    updateMontlyProfit();
		// update();
	}, []);

	async function updateMontlyProfit() {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
		let url = "http://127.0.0.1:8080/api/admin/monthly_profit";
		const response = await fetch(url, requestOptions);
		const data = await response.json();

		console.log("GOT DATA");
    console.log(data);

    // Update state
    setProfit(data['last_month_total']); 
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
            style={{height: '80%'}}
          >
            <CostumersInLine value={inLine} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            style={{height: '80%'}}
          >
            <CostumersInStore value={inStore} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            style={{height: '80%'}}
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
            <TotalProfit value={profit} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <CurrentCostumers />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <SalesByType />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestProducts />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
