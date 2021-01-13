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
import { ErrorSharp } from '@material-ui/icons';

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
  const [person, setPerson] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  function formPreventDefault(e) { 
    e.preventDefault();
  }

  async function updatePass() {
    // Process response
    // If error, show error warning
    errors.passwordbol = false;
    errors.confirmbol = false;


		if (values.password !== values.confirm) {
      setLoginError(true);
      errors.confirmbol = true;
      errors.passwordbol = true; 
    }

    if(values.password === '') {
      errors.passwordbol = true; 
    }

    if(values.confirm === '') {
      errors.confirmbol = true; 
    }

    if(values.password > 250){
      errors.passwordbol = true;       
    }

    if(values.confirm > 250){
      errors.confirmbol = true;
    }
    setErrors(errors)
    console.log(errors)
    if (errors.confirmbol || errors.passwordbol){
      return
    }

    

    const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
    body: JSON.stringify({email: person.email, password: values.password })
		};
    await fetch('http://127.0.0.1:8080/api/work/change_pw/', requestOptions).then(function(response) {
      if (!response.ok) {
          alert("There was a problem with the request!")
      } else {
        alert("Password changed!")
        window.location.reload();
      }

  })

  }
  
  useEffect(() => {
    async function fetchData() {
      const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };
      const response = await fetch('http://127.0.0.1:8080/api/work/person/', requestOptions);
      const data = await response.json();
      setPerson(data);
    }
    fetchData();
  }, []);


  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={formPreventDefault}
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
            error={errors.passwordbol}
            value={values.password}
            variant="outlined"
            required={true}
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            error={errors.confirmbol}
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
            required={true}
          />
        </CardContent>
        <Divider />
        
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <div style={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
          { 
            loginError && 
            <Typography
              color="error"
              variant="caption"
            >
              Passwords don't match!
            </Typography>
          }
          </div>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={updatePass}
          >
            Update
          </Button>
          <br />
          
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
