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
  const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [count, setCount] = useState(0);

  useEffect(() => {
    updateNotifications();
    const loop = setInterval(updateNotifications, 1000);
    return () => clearInterval(loop);
  }, [page, size]);

  async function updateNotifications() {
    const requestOptions = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };

    let url =
			"http://127.0.0.1:8080/api/work/notifications_help?page=" +
			page +
			"&size=" +
			size;
	
		const response = await fetch(url, requestOptions);
		const data = await response.json();
		setTasks(data['notifications']);
		setCount(data["totalItems"]);
  };

  return (
    <Page
      className={classes.root}
      title="Latest Purchases"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Results tasks={tasks} page={page} size={size} count={count} setPage={setPage} setSize={setSize}/>
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
