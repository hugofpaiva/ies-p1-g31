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
		updateProducts(value);
		setPage(value);
	};

	// Fazer chamada à API para obter produtos
	useEffect(() => {
		updateProducts(page);
		updateCategories();

	}, []);

	async function updateProducts(nextPage) {
		const requestOptions = {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		};
		let pageN = nextPage - 1;
		let url = "http://127.0.0.1:8080/api/work/products?page=" + pageN + "&size=" + itemsPerPage;
		if (search.trim() !== "") {
			url += "&name=" + search;
		}
		const response = await fetch(url, requestOptions);
		const data = await response.json();

		// Update products 
		setProducts(data['products']);
		// Update number of pages
		setNPages(data['totalPages']);
		// Update page
		setPage(data['currentPage']+1);
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

	function productHasChanged() {
		updateProducts(page);
	}

	function searchFunc(keyword) {
		setSearch(keyword, updateProducts(1));
	}

	return (
		<Page className={classes.root} title="Products">
			<Container maxWidth={false}>
				<Toolbar 
					persona={props.persona} 
					search={searchFunc}
					categories={categories}
					update={productHasChanged}
				/>
				<Box mt={3}>
					<Grid container spacing={3}>
						{products.map((product) => (
							<Grid item key={product.id} lg={4} md={6} xs={12}>
								<ProductCard
									className={classes.productCard}
									product={product}
									persona={props.persona}
									update={productHasChanged}
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
