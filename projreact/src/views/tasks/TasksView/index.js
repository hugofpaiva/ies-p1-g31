import React, { useState } from 'react';
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
  const [tasks] = useState(data);

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
