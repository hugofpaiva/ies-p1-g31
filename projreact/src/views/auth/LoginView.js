import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
	Box,
	Button,
	Container,
	Link,
	TextField,
	Typography,
	makeStyles,
} from "@material-ui/core";

import Page from "src/components/Page";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		height: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

const LoginView = () => {
	// When openned, delete local storage if not already
	localStorage.removeItem("notifications");
	localStorage.removeItem("token");
	localStorage.removeItem("authority");

	const classes = useStyles();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState(false);
	
	function redirectUser() {
		// Validate that token was created 
		if (localStorage.getItem('token') != null) {
			// If so, redirect
			if (localStorage.getItem('authority') == 'MANAGER') {
				window.location.href = "/admin";
				return false;
			} else if (localStorage.getItem('authority') == 'EMPLOYEE') {
				window.location.href = "/employee";
				return false;
			} 
		}
		return true;
	}

	async function login() {
		// Make request to auth API
		// Based on https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: email, password: password })
		};
		const response = await fetch('http://127.0.0.1:8080/api/login', requestOptions);
		const data = await response.json();
		
		// Process response
		// If error, show error warning
		if ('status' in data && data['status'] != 200) {
			setLoginError(true);
			return false;
		}
		// Otherwise, register user token
		if ('token' in data) {
			localStorage.setItem('token', data['token']);
			localStorage.setItem('authority', data['type']['authority']);
			// Redirect user to dashboard main page
			redirectUser();
		}
	}

	return (
		<Page className={classes.root} title="Login">
			<Box
				display="flex"
				flexDirection="column"
				height="100%"
				justifyContent="center"
			>
				<Container maxWidth="sm">
					<Formik
						initialValues={{
							email: "gmatos.ferreira@sapo.pt",
							password: "dasdfgh",
						}}
						validationSchema={Yup.object().shape({
							email: Yup.string()
								.email("Must be a valid email")
								.max(255)
								.required("Email is required"),
							password: Yup.string()
								.max(255)
								.required("Password is required"),
						})}
						onSubmit={() => {
							return login();
						}}
					>
						{({
							errors,
							handleBlur,
							handleChange,
							handleSubmit,
							isSubmitting,
							touched,
							values,
						}) => (
							<form onSubmit={handleSubmit}>
								<Box mb={3}>
									<Typography
										color="textPrimary"
										variant="h2"
									>
										Sign in
									</Typography>
									<Typography
										color="textSecondary"
										variant="caption"
									>
										Use amelia.rodrigues@gostore.com for Manager and pedro.paulo@gostore.com for Employee. The password is "abc" for both.
									</Typography>
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

								<TextField
									error={Boolean(
										touched.email && errors.email
									)}
									fullWidth
									helperText={touched.email && errors.email}
									label="Email Address"
									margin="normal"
									name="email"
									onBlur={handleBlur}
									onChange={(event) => setEmail(event.target.value)}
									type="email"
									value={email}
									variant="outlined"
								/>
								<TextField
									error={Boolean(
										touched.password && errors.password
									)}
									fullWidth
									helperText={
										touched.password && errors.password
									}
									label="Password"
									margin="normal"
									name="password"
									onBlur={handleBlur}
									onChange={(event) => setPassword(event.target.value)}
									type="password"
									value={password}
									variant="outlined"
								/>
								<Box my={2}>
									<Button
										color="primary"
										disabled={isSubmitting}
										fullWidth
										size="large"
										type="submit"
										variant="contained"
									>
										Sign in now
									</Button>
								</Box>
							</form>
						)}
					</Formik>
				</Container>
			</Box>
		</Page>
	);
};

export default LoginView;
