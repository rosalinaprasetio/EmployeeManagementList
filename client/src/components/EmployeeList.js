import React, { useState, useEffect } from "react";
import EmployeeServices from "./services/EmployeeServices";
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { TableSortLabel, Table, TableHead, TableBody, TableCell, TableContainer, TableFooter, FormLabel,
  TablePagination, TableRow, Paper, Typography, TextField, Button, InputAdornment, IconButton,
  Dialog, useMediaQuery, Snackbar } from '@material-ui/core';
import Menubar from './Menubar'
import EditEmployee from './EditEmployee';
import AddEmployee from './AddEmployee';
import DeleteEmployee from './DeleteEmployee';
import { useTranslation } from 'react-i18next';

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
    minWidth: 400,
  },
  title: {
    display:'flex',
    alignItems: 'center',
    marginBottom:20
  },
  info: {
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
    marginBottom:20,
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  action: {
    display: 'flex'
  },
  actionlink: {
    padding: 0,
    paddingRight:10
  },
  
}));

const styles = (theme) => ({
  dialogtitle: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogtitle} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


const EmployeeList = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [page, setPage] = useState(0);
  const [totalemployee, setTotalemployee] = useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [sort, setSort] = React.useState('id');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [errorMinSalary, setErrorMinSalary] = useState();
  const [errorMaxSalary, setErrorMaxSalary] = useState();
  const [clickAction, setClickAction] = useState();
  const [clickParam, setClickParam] = useState();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState();

  const headCells = [
    { id: 'id', numeric: false, disablePadding: false, label: t('dashboard.t_id') },
    { id: 'login', numeric: false, disablePadding: false, label: t('dashboard.t_login') },
    { id: 'name', numeric: false, disablePadding: false, label: t('dashboard.t_name') },
    { id: 'salary', numeric: true, disablePadding: false, label: t('dashboard.t_salary') },
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

  const resptheme = useTheme();
  const fullScreen = useMediaQuery(resptheme.breakpoints.down('xs'));

  useEffect(() => {
    retrieveEmployee();
  }, []);

  const retrieveEmployee = async () => {
    const response = await EmployeeServices.getPagination(page, rowsPerPage, sort, minSalary, maxSalary)
    setEmployees(response.data.docs);
    setTotalemployee(response.data.totalDocs)
  };

  const handleClickOpen = (action, param) => {
    setOpen(true);
    setClickAction(action);
    setClickParam(param);
  };

  const handleClose = () => {
    setOpen(false);
    setClickAction();
    setClickParam();
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const handleChangePage = async (event, newPage) => {
    const response = await EmployeeServices.getPagination(newPage, rowsPerPage, sort, minSalary, maxSalary)
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

    const response = await EmployeeServices.getPagination(0, rowsPerPage, nextsort, minSalary, maxSalary)
    setEmployees(response.data.docs);
    setTotalemployee(response.data.totalDocs)
    setPage(0);
    setOrder(nextorder);
    setOrderBy(property);
    setSort(nextsort)
  };

  const handleChangeMinSalary = (e) => {
    const value = e.target.value;
    if (value) {
      if (isNaN(Number(value))) {
        setErrorMinSalary('Incorrect Format.');
      }
      else if (Number(value) < 0) {
        setErrorMinSalary('Value should >= 0.0');
      }
      else if (maxSalary) {
        if (Number(value) > Number(maxSalary)) {
          setErrorMinSalary('Value should be <= Max Salary.');
        }
        else if (Number(value) <= Number(maxSalary)) {
          setErrorMaxSalary();
          setErrorMinSalary(); 
        }
        else {
          setErrorMinSalary();        
        }
      }
      else {
        setErrorMinSalary();
      }
      setMinSalary(value.toString());
    }
    else {
      setErrorMinSalary();
      setMinSalary('');

      if (maxSalary) {
        if (!isNaN(Number(maxSalary)) && Number(maxSalary) >= 0) {
          setErrorMaxSalary();
        }
      }
    }
  }

  const handleChangeMaxSalary = (e) => {
    const value = e.target.value;
    if (value) {
      if (isNaN(Number(value))) {
        setErrorMaxSalary('Incorrect Format.');
      }
      else if (Number(value) < 0) {
        setErrorMaxSalary('Value should >= 0.0');
      }
      else if (minSalary) {
        if (Number(value) < Number(minSalary)) {
          setErrorMaxSalary('Value should be >= Min Salary.');
        }
        else if (Number(value) >= Number(minSalary)) {
          setErrorMaxSalary();
          setErrorMinSalary(); 
        }
        else {
          setErrorMaxSalary();        
        }
      }
      else {
        setErrorMaxSalary();
      }
      setMaxSalary(value.toString());
    }
    else { 
      setErrorMaxSalary();
      setMaxSalary('');

      if (minSalary) {
        if (!isNaN(Number(minSalary)) && Number(minSalary) >= 0) {
          setErrorMinSalary();
        }
      }
      
    }
  }

  const handleSubmitSalary = async (e) => {
    e.preventDefault();

    if (!errorMinSalary && !errorMaxSalary) { 
      const response = await EmployeeServices.getPagination(0, rowsPerPage, sort, minSalary, maxSalary)
      setEmployees(response.data.docs);
      setTotalemployee(response.data.totalDocs)
      setPage(0);
    }
  }

  const handleEditSubmit = async (id) => {
    const response = await EmployeeServices.getPagination(page, rowsPerPage, sort, minSalary, maxSalary)
    setEmployees(response.data.docs);
    setTotalemployee(response.data.totalDocs);
    handleClose();
    setSnackMessage(`${id} has been updated`);
    setSnackOpen(true);
  }

  const handleCreateSubmit = async (id) => {
    const response = await EmployeeServices.getPagination(page, rowsPerPage, sort, minSalary, maxSalary)
    setEmployees(response.data.docs);
    setTotalemployee(response.data.totalDocs);
    handleClose();
    setSnackMessage(`${id} has been created`);
    setSnackOpen(true);
  }

  const handleDeleteSubmit = async (status, id) => {
    if (status === 'cancel') {
      handleClose();
    }
    else {
      var newPage = page;
      if (employees.length < 2 && page > 0) {
        newPage = page-1;
      }
      const response = await EmployeeServices.getPagination(newPage, rowsPerPage, sort, minSalary, maxSalary)
      setEmployees(response.data.docs);
      setTotalemployee(response.data.totalDocs);
      setPage(newPage);
      handleClose();
      setSnackMessage(`${id} has been deleted`);
      setSnackOpen(true);
    }
  }

  return (
    <div className={classes.root}>
      <Menubar/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h6" noWrap className={classes.title}>
          <PeopleAltIcon />&nbsp;{t('dashboard.title')}&nbsp;
          <IconButton onClick={() => handleClickOpen('add')} >
            <LibraryAddIcon style={{ color: '#000080' }}/>
          </IconButton>
        </Typography>
        <Alert severity="info" className={classes.info}>
          <div>To add employee, click plus sign above.</div>
          <div>To search by minimum salary, add decimal number in "Min Salary" and click Submit.</div>
          <div>To search by maximum salary, add decimal number in "Max Salary" and click Submit.</div>
          <div>To search by all salary, clear the decimal number in "Min Salary" and "Max Salary" and click Submit</div>
        </Alert>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmitSalary}>
          <FormLabel component="legend">{t('dashboard.search')}:</FormLabel>
          <TextField error={errorMinSalary ? true : false} size="small" 
            color="primary" id='min-salary' label="Min Salary" value={minSalary}
            InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
            variant="outlined" helperText={errorMinSalary} onChange={handleChangeMinSalary} />
          <TextField error={errorMaxSalary ? true : false} size="small" 
            color="primary" id='max-salary' label="Max Salary" value={maxSalary}
            InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
            variant="outlined" helperText={errorMaxSalary} onChange={handleChangeMaxSalary} />
          <Button type="submit" size="medium" variant="contained" color="primary" >{t('dashboard.button')}</Button>
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
                    <div className={classes.action}>
                      <IconButton onClick={() => handleClickOpen('edit',row.id)} className={classes.actionlink}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleClickOpen('delete',row.id)} className={classes.actionlink}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
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
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {(clickAction === 'edit') ? 'Edit' : ((clickAction === 'add') ? 'Add' : 'Delete')} Employee
        </DialogTitle>
        {
          (clickAction === 'edit') ? (<EditEmployee employeeid={clickParam} handleEditSubmit={handleEditSubmit} />) : 
          ((clickAction === 'add') ? (<AddEmployee handleCreateSubmit={handleCreateSubmit} />) : 
          (<DeleteEmployee employeeid={clickParam} handleDeleteSubmit={handleDeleteSubmit} />))
          
        }
      
      </Dialog>
      <Snackbar open={snackOpen} autoHideDuration={3000} key={'top center'}
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} variant="filled" elevation={6} severity="success">
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
    
  );
};

export default EmployeeList;