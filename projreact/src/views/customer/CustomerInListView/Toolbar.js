import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
	Box,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
	root: {},
	importButton: {
		marginRight: theme.spacing(1),
	},
	exportButton: {
		marginRight: theme.spacing(1),
	},
}));

const Toolbar = ({ className, setSearchName, searchName, ...rest }) => {
	const classes = useStyles();
	const [search, setSearch] = useState();
	const [delayTimer, setDelayTimer] = useState();
	const changeSearch = (e) => {
		let value = e.target.value;
		setSearch(value);
		clearTimeout(delayTimer);
		setDelayTimer(
			setTimeout(function() {
				setSearchName(value);
			}, 500)
		);
	};

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			{/* 
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add customer
        </Button>
      </Box>
      */}
			<Box mt={3}>
				<Card>
					<CardContent>
						<Box maxWidth={500}>
							<TextField
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<SvgIcon
												fontSize="small"
												color="action"
											>
												<SearchIcon />
											</SvgIcon>
										</InputAdornment>
									),
								}}
								placeholder="Search Customer"
								variant="outlined"
								onChange={changeSearch}
								value={search}
							/>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</div>
	);
};

Toolbar.propTypes = {
	className: PropTypes.string,
};

export default Toolbar;
