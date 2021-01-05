import React, { useState, useEffect } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import ProductCard from "./ProductCard";
import data from "./data";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	productCard: {
		height: "100%",
	},
}));

const ProductList = (props) => {
	const classes = useStyles();
	// Inicializar o estado products
	const [products, setProducts] = useState([]);
	const itemsPerPage = 6;
	const [page, setPage] = React.useState(1);
	const [noOfPages] = React.useState(
		Math.ceil(products.length / itemsPerPage)
	);

	const handleChange = (event, value) => {
		setPage(value);
	};

	// Fazer chamada à API para obter produtos
	useEffect(async() => {
		const requestOptions = {
			method: 'get',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
		const response = await fetch('http://127.0.0.1:8080/api/work/products', requestOptions);
		const data = await response.json();
		console.log("GOT DATA");
		console.log(data);
		setProducts(data['products']);
	}, []);

	return (
		<Page className={classes.root} title="Products">
			<Container maxWidth={false}>
				<Toolbar persona={props.persona} />
				<Box mt={3}>
					<Grid container spacing={3}>
						{products.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((product) => (
							<Grid item key={product.id} lg={4} md={6} xs={12}>
								<ProductCard
									className={classes.productCard}
									product={product}
									persona={props.persona}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
				<Box mt={3} display="flex" justifyContent="center">
					<Pagination
						color="primary"
						count={noOfPages}
						page={page}
						defaultPage={1}
						showFirstButton
						showLastButton
						onChange={handleChange}
						size="small"
					/>
				</Box>
			</Container>
		</Page>
	);
};

export default ProductList;
