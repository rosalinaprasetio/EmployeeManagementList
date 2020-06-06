import React, { useState, useEffect } from "react";
import EmployeeServices from "./services/EmployeeServices";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TableSortLabel, Table, TableHead, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper } from '@material-ui/core';

import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [totalemployee, setTotalemployee] = useState(0);
  const [dense, setDense] = useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [sort, setSort] = React.useState('id');

  const classes = makeStyles({
    table: {
      minWidth: 500,
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
  });

  useEffect(() => {
    retrieveEmployee();
  }, []);

  const retrieveEmployee = async () => {
    const response = await EmployeeServices.getPagination(page, rowsPerPage, sort)
    setEmployees(response.data.docs);
    setTotalemployee(response.data.totalDocs)
    console.log(employees);
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
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    if (order === 'asc') {
      setSort(property)
    }
    else {
      setSort('-'+property)
    }

    const response = await EmployeeServices.getPagination(0, rowsPerPage, sort)
    setEmployees(response.data.docs);
    setTotalemployee(response.data.totalDocs)
    setPage(0);
  };

  const headCells = [
    { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
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

  return (
    <TableContainer component={Paper}>
      <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
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
  );
};

export default EmployeeList;