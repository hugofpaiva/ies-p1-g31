import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Help from './Help';
import LowStock from './LowStock';
import EntriesOut from './EntriesOut';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import InputIcon from '@material-ui/icons/Input';
import GroupIcon from '@material-ui/icons/Group';


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
  const [notificationsHelp, setNotificationsHelp] = useState([]);
  const [notificationsStock, setNotificationsStock] = useState([]);

  useEffect(async () => {
    setInterval(updateNotifications, 1000);
  }, []);

  function updateNotifications() {
    const nots = localStorage.getItem("notifications") != null ? JSON.parse(localStorage.getItem("notifications"))['notifications'] : [];
    setNotificationsHelp(nots.filter(not => not['update'].indexOf("help") > 0).map(not => ({...not, icon: <AssignmentIcon />})));    
    setNotificationsStock(nots.filter(not => not['update'].indexOf("restock") > 0).map(not => ({...not, icon: <ShoppingBasketIcon />})));    
    /*
    setNotifications(nots.map(not => {
      // Correct icon
      if (not['update'].indexOf("help") > 0) {
        not['icon'] = <AssignmentIcon />;
      } else if (not['update'].indexOf("restock") > 0) {
        not['icon'] = <ShoppingBasketIcon />;
      } else if (not['update'].indexOf("full") > 0) {
        not['icon'] = <GroupIcon />;
      }
      return not;
    }
    )
    );
    */
  }

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
            <Help notificationsArray={notificationsHelp} />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <LowStock notificationsArray={notificationsStock} />
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
