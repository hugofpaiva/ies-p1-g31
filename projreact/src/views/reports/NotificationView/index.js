import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Help from './Help';
import LowStock from './LowStock';
import EntriesOut from './EntriesOut';



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

  return (
    <Page
      className={classes.root}
      title="Notifications"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <Help />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <LowStock />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <EntriesOut />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
