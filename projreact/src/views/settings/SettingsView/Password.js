import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });
  const [loginError, setLoginError] = useState(false);
  const [person, setPerson] = useState(null);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  async function updatePass() {
    // Process response
		// If error, show error warning
		if (values.password != values.confirm) {
      setLoginError(true);
			return false;
    }
    const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify({email: person.email, password: values.password })
		};
		const response = await fetch('http://127.0.0.1:8080/api/work/change_pw/', requestOptions);
    const data = await response.json();
    return false
  }
  
  useEffect(async() => {
    const requestOptions = {
      method: 'GET',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = await fetch('http://127.0.0.1:8080/api/work/person/', requestOptions);
    const data = await response.json();
    console.log(data);
    setPerson(data);

  }, []);


  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={() => {
        return updatePass();
      }}
    >
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Update
          </Button>
          <br />
          { 
            loginError && 
            <Typography
              color="error"
              variant="caption"
            >
              Wrong credentials! Please, try again.
            </Typography>
          }
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
