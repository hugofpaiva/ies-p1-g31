import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

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
  const itemsPerPage = 20;
  const totalItems = 1000;
  const [page, setPage] = React.useState(1);
  const [nPages, setNPages] = React.useState(
    Math.ceil(transactions.length / itemsPerPage)
  );

  // Fazer chamada à API para obter produtos
  useEffect(async () => {
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
    let pageN = page - 1;
    let url = "http://127.0.0.1:8080/api/admin/purchases/";
    const nif = new URLSearchParams(window.location.search).get("nif");
    if (nif != null) {
      url += nif;
    }
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    console.log("GOT DATA");
    console.log(data);

    // Update transactions
    setTransactions(data['transactions']);
    // Update number of pages
    setNPages(data['totalPages']);
    // Update page
    setPage(data['currentPage'] + 1);
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
