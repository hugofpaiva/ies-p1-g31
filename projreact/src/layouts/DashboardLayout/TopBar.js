import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Link
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

let notificationsList = [];
const isAdmin = window.location.href.indexOf("admin") > 0;

if (isAdmin) {
  notificationsList = [
    {
      "update": "Low Stock on Milk",
      "timestamp": 1606905012000,
      "icon": <ShoppingBasketIcon />,
      "link": "/admin/products/"
    },
    {
      "update": "Store is Full",
      "timestamp": 1606905192000,
      "icon": <ShoppingBasketIcon />,
      "link": "/admin/customers/in_store"
    }
  ]
} else {
  notificationsList = [
    {
      "update": "Help needed by João",
      "timestamp": 1606905312000,
      "icon": <AssignmentIcon />,
      "link": "/employee/help"
    }
  ]
}

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState(notificationsList);
  const [admin] = useState(isAdmin);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openTasks = (event) => {
    handleClose();

  };

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        {/*<RouterLink to="/">
          <Logo />
  </RouterLink>*/}
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit" onClick={handleClick}>
            <Badge
              badgeContent={notifications.length}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <InputIcon onClick={() => { window.location.href = "/" }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            menuAlign={{ lg: 'right' }}
          >
            <MenuList>
              {notifications.map((n) => (
                <MenuItem
                  onClick={() => { window.location.href = n.link; }}
                >
                  <ListItemIcon fontSize="small">
                    {n.icon}
                  </ListItemIcon>
                  <Typography>{n.update}</Typography>
                </MenuItem>
              ))}
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
