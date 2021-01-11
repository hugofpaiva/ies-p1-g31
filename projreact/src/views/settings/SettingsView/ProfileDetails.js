import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
  firstName: 'Pedro',
  lastName: 'Paulo',
  email: 'pedro.paulo@gostore.com',
  admin: false,
}

const ProfileDetails = ({ persona, className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(myVals);
  const [isAdmin, setAdmin] = useState(false);
  const [person, setPerson] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  async function updateInfo() {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
			body: JSON.stringify({...person, name: values.firstName + " " + values.lastName, email: values.email})
		};
		const response = await fetch('http://127.0.0.1:8080/api/work/person/', requestOptions);
    const data = await response.json();
    alert(data.name)
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
      const response = await fetch('http://127.0.0.1:8080/api/work/person/', requestOptions);
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
      onSubmit={() => {
        return updateInfo();
      }}
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
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
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
                name="email"
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
