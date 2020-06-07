import React, { useState, useEffect } from "react";
import EmployeeServices from "./services/EmployeeServices";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TableSortLabel, Table, TableHead, TableBody, TableCell, TableContainer, TableFooter, 
  TablePagination, TableRow, Paper, Typography, TextField, Button, InputAdornment } from '@material-ui/core';
import Menubar from './Menubar.js'

const headCells = [
  { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
  { id: 'login', numeric: false, disablePadding: false, label: 'Login' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'salary', numeric: true, disablePadding: false, label: 'Salary' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
         <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  table: {
    minWidth: 500,
  },
  title: {
    marginBottom:20
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const EmployeeList = () => {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [page, setPage] = useState(0);
  const [totalemployee, setTotalemployee] = useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [sort, setSort] = React.useState('id');
  const [minSalary, setMinSalary] = useState();
  const [maxSalary, setMaxSalary] = useState();
  const [errorMinSalary, setErrorMinSalary] = useState();
  const [errorMaxSalary, setErrorMaxSalary] = useState();

  useEffect(() => {
    retrieveEmployee();
  }, []);

  const retrieveEmployee = async () => {
    const response = await EmployeeServices.getPagination(page, rowsPerPage, sort)
    setEmployees(response.data.docs);
    setTotalemployee(response.data.totalDocs)
  };

  const handleChangePage = async (event, newPage) => {
    const response = await EmployeeServices.getPagination(newPage, rowsPerPage, sort)
    setEmployees(response.data.docs);
    setTotalemployee(response.data.totalDocs)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = async (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    let nextorder = isAsc ? 'desc' : 'asc';
    var nextsort;
    if (nextorder === 'asc') {
      nextsort = property;
    }
    else {
      nextsort = '-'+property
    }

    const response = await EmployeeServices.getPagination(0, rowsPerPage, nextsort)
    setEmployees(response.data.docs);
    setTotalemployee(response.data.totalDocs)
    setPage(0);
    setOrder(nextorder);
    setOrderBy(property);
    setSort(nextsort)
  };

  const handleChangeMinSalary = (e) => {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      setErrorMinSalary('Incorrect Format.');
    }
    else if (Number(value) < 0) {
      setErrorMinSalary('Value should >= 0.0');
    }
    else if (maxSalary && value > maxSalary) {
      setErrorMinSalary('Value should be <= Max Salary.');
    }
    else {
      setErrorMinSalary();
      setMinSalary(value);
    }
  }

  const handleChangeMaxSalary = (e) => {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      setErrorMaxSalary('Incorrect Format.');
    }
    else if (Number(value) < 0) {
      setErrorMaxSalary('Value should >= 0.0');
    }
    else if (minSalary && value < minSalary) {
      setErrorMaxSalary('Value should be >= Min Salary.');
    }
    else {
      setErrorMaxSalary();
      setMaxSalary(value);
    }
  }

  return (
    <div className={classes.root}>
      <Menubar/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h6" noWrap className={classes.title}>
          Employee List
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          Search By:
          <TextField error={errorMinSalary ? true : false} size="small" 
            color="primary" id='min-salary' label="Min Salary" value={minSalary}
            InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
            variant="outlined" helperText={errorMinSalary} onChange={handleChangeMinSalary} />
          <TextField error={errorMaxSalary ? true : false} size="small" 
            color="primary" id='max-salary' label="Max Salary" value={maxSalary}
            InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
            variant="outlined" helperText={errorMaxSalary} onChange={handleChangeMaxSalary} />
          <Button size="medium" variant="contained" color="primary" >Submit</Button>
        </form>
        <TableContainer component={Paper}>
          <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size='medium'
                aria-label="custom pagination enhanced table"
              >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {employees && employees.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    {row.login}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    {row.salary}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    Edit&nbsp;Delete
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  count={totalemployee}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  backIconButtonProps={{
                    "aria-label": "Previous Page"
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Next Page"
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>  
      </main>
    </div>
     
  );
};

export default EmployeeList;