import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  makeStyles,
  MenuList,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import InputIcon from '@material-ui/icons/Input';
import GroupIcon from '@material-ui/icons/Group';

/*
{
  "id": "5ff5de724b3bb169f3a9b6fd",
  "type": "HELP",
  "date": null,
  "idProduct": 0,
  "qty": 0,
  "nif": 111900377,
  "state": "PENDING"
}

{
  "id": "5ff5e01b4b3bb169f3a9b798",
  "type": "STORE_FULL",
  "date": null,
  "idProduct": 0,
  "qty": 0,
  "nif": 0,
  "state": null
}
*/

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const isAdmin = window.location.href.indexOf("admin") > 0;

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  // localStorage.removeItem("notifications");
  const classes = useStyles();
  const [admin] = useState(isAdmin);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [notifications, setNotifications] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // Close notifications
    setAnchorEl(null);
    // Mark 10 first notifications as seen
    let counter = 0;
    setNotifications(oldArray => {
      const newArray = oldArray.map((not, i) => {
        if (!not['seen'] && counter < 10) {
          not['seen'] = true;
          counter += 1;
        }
        return not;
      });
      localStorage.setItem("notifications", JSON.stringify({ notifications: newArray.map(
        not => ({...not, "icon": ""})
      ) }));
      return newArray;
    });
  };

  useEffect(() => {
    // Notifications on local storage
    let nots = localStorage.getItem("notifications") != null ? JSON.parse(localStorage.getItem("notifications"))['notifications'] : [];
    // Put them on view
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

    // Sockets
    const socket = new SockJS('http://localhost:8080/api/ws');
    const stompClient = Stomp.over(socket);
    const headers = {};

    // Employee only subscribes to help
    if (localStorage.getItem('authority') === 'EMPLOYEE') {
      stompClient.connect(headers, () => {
        stompClient.subscribe('/topic/help', function (messageOutput) {
          const not = JSON.parse(messageOutput.body);
          setNotifications(oldArray => {
            const newArray = [...oldArray, {
              ...not,
              "key": not["id"],
              "update": `Client ${not['nif']} needs help!`,
              "timestamp": Date.now(),
              "icon": <AssignmentIcon />,
              "link": "/employee/help",
              "seen": false,
              "employee": true,
              "manager": false,
            }];
            localStorage.setItem("notifications", JSON.stringify({ notifications: newArray.map(
              not => ({...not, "icon": ""})
            ) }));
            return newArray;
          })
        });
      });
    }
    // Manager subscribes to all
    else if (localStorage.getItem('authority') === 'MANAGER') {
      stompClient.connect(headers, () => {
        stompClient.subscribe('/topic/restock', function (messageOutput) {
          const not = JSON.parse(messageOutput.body);
          setNotifications(oldArray => {
            const newArray = [...oldArray, {
              ...not,
              "key": not["id"],
              "update": `Product ${not['idProduct']} needs restock!`,
              "timestamp": Date.now(),
              "icon": <ShoppingBasketIcon />,
              "link": "/admin/products",
              "seen": false,
              "employee": false,
              "manager": true,
            }];
            localStorage.setItem("notifications", JSON.stringify({ notifications: newArray.map(
              not => ({...not, "icon": ""})
            ) }));
            return newArray;
          })
        });
        stompClient.subscribe('/topic/store_full', function (messageOutput) {
          const not = JSON.parse(messageOutput.body);
          setNotifications(oldArray => {
            const newArray = [...oldArray, {
              ...not,
              "key": not["id"],
              "update": `Store is full!`,
              "timestamp": Date.now(),
              "icon": <GroupIcon />,
              "link": "/admin/customers/in_store",
              "seen": false,
              "employee": false,
              "manager": true,
            }];
            localStorage.setItem("notifications", JSON.stringify({ notifications: newArray.map(
              not => ({...not, "icon": ""})
            ) }));
            return newArray;
          })
        });
        stompClient.subscribe('/topic/help', function (messageOutput) {
          const not = JSON.parse(messageOutput.body);
          setNotifications(oldArray => {
            const newArray = [...oldArray, {
              ...not,
              "key": not["id"],
              "update": `Client ${not['nif']} needs help!`,
              "timestamp": Date.now(),
              "icon": <AssignmentIcon />,
              "link": "/employee/help",
              "seen": false,
              "employee": true,
              "manager": false,
            }];
            localStorage.setItem("notifications", JSON.stringify({ notifications: newArray.map(
              not => ({...not, "icon": ""})
            ) }));
            return newArray;
          })
        });
      });
    }

    return () => stompClient && stompClient.disconnect();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authority");
    localStorage.removeItem("notifications");
    window.location.href = "/";
  }

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit" onClick={handleClick}>
            <Badge
              badgeContent={notifications.filter(
                  n => !n['seen']
                  &&
                  (
                    (localStorage.getItem('authority') === 'EMPLOYEE'  && n['employee'])
                    || 
                    (localStorage.getItem('authority') === 'MANAGER'  && n['manager'])
                  )
                ).length}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => logOut()}>
            <InputIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            menualign={{ lg: 'right' }}
          >
            <MenuList>
              {
                // Only show notifications not seen yet
                // Only show those that meet the authority
                notifications.filter(
                  n => !n['seen']
                  &&
                  (
                    (localStorage.getItem('authority') === 'EMPLOYEE'  && n['employee'])
                    || 
                    (localStorage.getItem('authority') === 'MANAGER'  && n['manager'])
                  )
                ).map((n) => (
                  <MenuItem
                    key={n.key}
                    onClick={() => { window.location.href = n.link; }}
                  >
                    <ListItemIcon fontSize="small">
                      {n.icon}
                    </ListItemIcon>
                    <Typography>{n.update}</Typography>
                  </MenuItem>
                )
                )
              }
              {
                admin &&
                <MenuItem onClick={() => { window.location.href = "/admin/notifications/" }} style={{ color: "blue", fontSize: "small", align: "center" }}>
                  See All Notifications
                </MenuItem>
              }
            </MenuList>
          </Menu>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};


TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
