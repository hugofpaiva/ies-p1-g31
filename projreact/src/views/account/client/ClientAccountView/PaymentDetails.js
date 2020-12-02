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
    makeStyles,
    Typography
} from '@material-ui/core';
import { CreditCard } from '@material-ui/icons';

import PaymentDialog from './PaymentDialog';

const useStyles = makeStyles(() => ({
    root: {}
}));

const PaymentDetails = (props, { className, ...rest }) => {
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
            <Card style={{ marginBottom: '3rem' }}>
                <CardHeader
                    subheader="Make sure you have a valid card registered!"
                    title="Payment details"
                />
                <Divider />
                <CardContent>
                    {
                        values.paymentCards.map(card => (
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid item>
                                    <CreditCard style={{ marginRight: '.5rem' }} />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        className={classes.dateText}
                                    >{card.number}</Typography>
                                    <Typography
                                        className={classes.dateText}
                                        color='textSecondary'
                                    >Expires on {card.expires}</Typography>
                                    {
                                        card.default &&
                                        <Typography
                                            className={classes.dateText}
                                            color='textSecondary'
                                        >This is your default card!</Typography>
                                    }
                                </Grid>
                            </Grid>
                        ))
                    }
                </CardContent>
                <Divider />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                >
                    <PaymentDialog />
                </Box>
            </Card>
        </form>
    );
};

PaymentDetails.propTypes = {
    className: PropTypes.string
};

export default PaymentDetails;
