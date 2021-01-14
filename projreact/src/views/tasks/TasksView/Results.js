import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
	Box,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
  makeStyles,
  TableSortLabel,
	Chip,
	Grid,
	colors,
} from "@material-ui/core";

import ResolveRequest from "./ResolveRequest";

const useStyles = makeStyles((theme) => ({
	root: {},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

const Results = ({ className, tasks, page, size, count, setSize, setPage, ...rest }) => {
	const classes = useStyles();


	const handleLimitChange = (event) => {
		setSize(event.target.value);
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
              <TableCell>
										<TableSortLabel active direction="desc">
											Date
										</TableSortLabel>
									</TableCell>
								<TableCell>Customer NIF</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Operation</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tasks.map((task) => (
								<TableRow hover key={task.id}>
									<TableCell>
										{moment(task.date).format(
											"DD/MM/YYYY, hh:mm:ss"
										)}
									</TableCell>
									<TableCell>{task.nif}</TableCell>
									<TableCell>
										<Chip
											color={
												task.state === "PENDING"
													? "secondary"
													: task.state === "RESOLVED" 
													? "primary"
													: '#bbdefb'
											}
											label={task.state}
											size="small"
										/>
									</TableCell>
									<TableCell>
										{task.state === "PENDING" ? (
											<Grid
												container="true"
												direction="row"
											>
												<ResolveRequest task={task} />
											</Grid>
										) : (
											<Grid></Grid>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
        count={count}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={size}
        rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};

Results.propTypes = {
	className: PropTypes.string,
	tasks: PropTypes.array.isRequired,
};

export default Results;
