import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);

  // Fazer chamada à API para obter produtos
  useEffect(() => {
    updateTransactions();
  }, []);

  async function updateTransactions() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };
    let url = "http://127.0.0.1:8080/api/admin/purchases/";
    const nif = new URLSearchParams(window.location.search).get("nif");
    if (nif != null) {
      url += nif;
    }
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    
    // Update transactions
    setTransactions(data['transactions']);
  }

  return (
    <Page
      className={classes.root}
      title="Latest Purchases"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results transactions={transactions} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
