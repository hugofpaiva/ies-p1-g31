import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
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
  const [tasks, setTasks ] = useState(data);

  useEffect(async() => {
    const requestOptions = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };
    const response = await fetch('http://127.0.0.1:8080/api/work/notifications_help', requestOptions);
    const data = await response.json();
    console.log("GOT DATA");
    console.log(data);
    setTasks(data['notifications']);
}, []);

  return (
    <Page
      className={classes.root}
      title="Latest Purchases"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Results tasks={tasks} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
