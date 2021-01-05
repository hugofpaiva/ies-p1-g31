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
	const [nPages, setNPages] = React.useState(
		Math.ceil(products.length / itemsPerPage)
	);

	const handleChange = (event, value) => {
		setPage(value);
		updateProducts();
	};

	// Fazer chamada à API para obter produtos
	useEffect(async() => {
		updateProducts();
	}, []);

	async function updateProducts() {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
		let pageN = page - 1;
		let url = "http://127.0.0.1:8080/api/work/products?page=" + pageN + "&size=" + itemsPerPage;
		const response = await fetch(url, requestOptions);
		const data = await response.json();

		console.log("GOT DATA");
		console.log(data);

		// Update products 
		setProducts(data['products']);
		// Update number of pages
		setNPages(data['totalPages']);
		// Update page
		setPage(data['currentPage']+1);
	}

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
									update={updateProducts}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
				<Box mt={3} display="flex" justifyContent="center">
					<Pagination
						color="primary"
						count={nPages}
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
