import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Url} from "src/ApiConsts";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const myVals = {
  firstName: '',
  lastName: '',
  email: '',
  admin: false,
}

const ProfileDetails = ({ persona, className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(myVals);
  const [isAdmin, setAdmin] = useState(false);
  const [person, setPerson] = useState({});
  const [errors, setErrors] = useState({});


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(values);
  };

  function validate() {
    let errors = {}
    let ret = true;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    errors.emailbol = false;
    errors.firstbol = false;
    errors.lastbol = false;

    if (values.email && !re.test(String(values.email).toLowerCase()) || values.email.length > 250) {
      errors.emailbol = true;
      ret = false;
    }

    if (values.firstName && values.firstName.length > 125) {
      errors.firstbol = true;
      ret = false;
    }

    if (values.lastName && values.lastName.length > 125) {
      errors.lastbol = true;
      ret = false;
    }

    setErrors(errors);
    return ret;
  }

  function formPreventDefault(e) { 
    e.preventDefault();
  }

  async function updateInfo() {
    if(!validate()){
      return
    }

		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
			body: JSON.stringify({...person, name: values.firstName + " " + values.lastName, email: values.email})
		};
		const response = await fetch(Url + '/api/work/person/', requestOptions).then(function(response) {
      if (!response.ok) {
          alert("There was a problem with the request!")
      } else {
        alert("Profile changed!")
        if (person.email !== values.email){
          alert("By changing the email, a new login is required. You will be redirected.")
          localStorage.removeItem("token");
          localStorage.removeItem("authority");
          localStorage.removeItem("notifications");
          localStorage.removeItem("name");
          window.location.href = "/";
        }
        window.location.reload();
      }
  })
    return false
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
      const response = await fetch(Url + '/api/work/person/', requestOptions);
      const data = await response.json();
      console.log(data);
      if(data["type"] === "MANAGER"){
        setAdmin(true)
      }
      else{
        setAdmin(false)
      }
  
      setValues({
        firstName: data["name"].split(" ")[0],
        lastName: data["name"].split(" ")[1],
        email: data["email"],
        admin: isAdmin,
  
      });
  
      setPerson(data);
    }
    fetchData();
  }, []);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={formPreventDefault}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                error={errors.firstbol}
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                error={errors.lastbol}
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                error={errors.emailbol}
                name="email"
                type="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
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
            onClick={updateInfo}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
