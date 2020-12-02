import React, { useState } from 'react';
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

import ProfileDialog from './ProfileDialog';

const states = [
  {
    label: 'Aveiro',
    value: 'aveiro'
  },
  {
    label: 'Beja',
    value: 'beja'
  },
  {
    label: 'Bragança',
    value: 'bragança'
  },
  {
    label: 'Castelo Branco',
    value: 'castelo-branco'
  },
  {
    label: 'Coimbra',
    value: 'coimbra'
  },
  {
    label: 'Évora',
    value: 'evora'
  },
  {
    label: 'Faro',
    value: 'faro'
  },
  {
    label: 'Guarda',
    value: 'guarda'
  },
  {
    label: 'Leiria',
    value: 'leiria'
  },
  {
    label: 'Lisboa',
    value: 'lisboa'
  },
  {
    label: 'Portalegre',
    value: 'portalegre'
  },
  {
    label: 'Porto',
    value: 'porto'
  },
  {
    label: 'Santarém',
    value: 'santarem'
  },
  {
    label: 'Setúbal',
    value: 'setubal'
  },
  {
    label: 'Viana do Castelo',
    value: 'viana-castelo'
  },
  {
    label: 'Vila Real',
    value: 'vila-real'
  },
  {
    label: 'Viseu',
    value: 'viseu'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = (props, { className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(props.data);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card style={{marginBottom: '3rem'}}>
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
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
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
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
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
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <ProfileDialog />
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
