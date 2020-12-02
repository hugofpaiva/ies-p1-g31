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
  MenuList
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

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([
    {
      "update":"Assistance needed 'Row 3'",
      "timestamp":1606905012000,
      "icon": <ShoppingBasketIcon/>
      },
      {
      "update":"Assistance needed at coffee machine",
      "timestamp":1606905192000,
      "icon": <ShoppingBasketIcon/>
      },
      {
      "update":"New task: restore shelf 26B",
      "timestamp":1606905312000,
      "icon": <AssignmentIcon/>
      }
  ]);

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
              <InputIcon />
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
                  <MenuItem onClick={handleClose}>
                  <ListItemIcon fontSize="small">
                    {n.icon}
                  </ListItemIcon>
                  <Typography>{n.update}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={openTasks} style={{color:"blue", fontSize:"small", align: "center"}}>
                  See All Notifications
                </MenuItem>
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
