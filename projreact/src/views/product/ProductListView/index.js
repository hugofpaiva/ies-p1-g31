import React, { useState, useEffect } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import ProductCard from "./ProductCard";

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
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState("");
	const itemsPerPage = 6;
	const [page, setPage] = React.useState(1);
	const [nPages, setNPages] = React.useState(
		Math.ceil(products.length / itemsPerPage)
	);

	const handleChange = (event, value) => {
		setPage(value);
	};

	// Fazer chamada à API para obter produtos
	useEffect(() => {
		updateCategories();
	}, []);
	// Fazer chamada à API para obter produtos
	// Ao início e sempre que page e size sejam alterados
	// Repetir todos os segundos para manter stock atualizado
	useEffect(() => {
		updateProducts();
		const loop = setInterval(() => {
			updateProducts()
		}, 1000);
		return () => clearInterval(loop);
	}, [page, search]);

	async function updateProducts() {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
		let url = "http://127.0.0.1:8080/api/work/products?page=" + (page - 1) + "&size=" + itemsPerPage;
		if (search.trim() !== "") {
			url += "&name=" + search;
		}
		const response = await fetch(url, requestOptions);
		const data = await response.json();

		// Update products 
		setProducts(data['products']);
		// Update number of pages
		setNPages(data['totalPages']);
		// If number of pages is less than the selected, reset to first
		if (data['totalPages'] < page) {
			setPage(1);
		}
	}

	async function updateCategories() {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
		let url = "http://127.0.0.1:8080/api/work/productscategories";
		const response = await fetch(url, requestOptions);
		const data = await response.json();
		// Update categories 
		setCategories(data);
	}

	return (
		<Page className={classes.root} title="Products">
			<Container maxWidth={false}>
				<Toolbar 
					persona={props.persona} 
					search={setSearch}
					categories={categories}
					update={updateProducts}
				/>
				<Box mt={3}>
					<Grid container spacing={3}>
						{products.map((product) => (
							<Grid item key={product.id} lg={4} md={6} xs={12}>
								<ProductCard
									className={classes.productCard}
									product={product}
									persona={props.persona}
									update={updateProducts}
									categories={categories}
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
