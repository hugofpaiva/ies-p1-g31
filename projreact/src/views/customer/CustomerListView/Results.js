import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
	Box,
  Card,
  Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	makeStyles,
} from "@material-ui/core";
import {
  DollarSign 
} from "react-feather";

const useStyles = makeStyles((theme) => ({
	root: {},
	avatar: {
		marginRight: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
}));

const Results = ({ className, customers, ...rest }) => {
	const classes = useStyles();
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<PerfectScrollbar>
				<Box minWidth={1050}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>NIF</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Last Visit</TableCell>
								<TableCell>Latest Purchases</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{customers.slice(0, limit).map((customer) => (
								<TableRow hover key={customer.nif}>
									<TableCell>
										<Typography
											color="textPrimary"
											variant="body1"
										>
											{customer.name}
										</Typography>
									</TableCell>
									<TableCell>{customer.nif}</TableCell>
									<TableCell>{customer.email}</TableCell>
									<TableCell>
										{moment(customer.last_visit).format('DD/MM/YYYY, h:mm:ss')}
									</TableCell>
									<TableCell>
										<Button
                      variant="contained"
											component={RouterLink}
											to={'/admin/orders?nif='+customer.nif}
										>
                      <DollarSign className={classes.icon} size="20" />
						<span className={classes.title}>Purchases</span>
                    </Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
				count={customers.length}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};

Results.propTypes = {
	className: PropTypes.string,
	customers: PropTypes.array.isRequired,
};

export default Results;
