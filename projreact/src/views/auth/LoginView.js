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
	const classes = useStyles();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [loginError, setLoginError] = useState(false);

	const login = () => {
		setLoginError(false);
		console.log("LOGGING")
		if (email=="amelia.rodrigues@gostore.com")
			navigate("/admin", { replace: true });
		else if (email=="pedro.paulo@gostore.com")
			navigate("/employee", { replace: true });
		else
			setLoginError(true);
		return true;
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
							email: "demo@storego.pt",
							password: "Password123",
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
										Use amelia.rodrigues@gostore.com for Manager and pedro.paulo@gostore.com for Employee.
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
									onChange={handleChange}
									type="password"
									value={values.password}
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
