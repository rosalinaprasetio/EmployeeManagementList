import React, { useState, useEffect } from "react";
import EmployeeServices from "./services/EmployeeServices";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  /*const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");*/

  useEffect(() => {
    retrieveEmployee();
  }, []);

  /*const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };*/

  const retrieveEmployee = () => {
    EmployeeServices.getAll()
      .then(response => {
        setEmployees(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
/*
  const refreshList = () => {
    retrieveTutorials();
    setCurrentEmployee(null);
    setCurrentIndex(-1);
  };

  const setActiveEmployee = (users, index) => {
    setCurrentEmployee(users);
    setCurrentIndex(index);
  };

  const removeAllEmployee = () => {
    EmployeeService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    EmployeeService.findByTitle(searchTitle)
      .then(response => {
        setEmployee(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
*/
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Login</th>
                    <th>Name</th>
                    <th>Salary</th>
                </tr>
            </thead>
            <tbody>
            {
                employees && employees.map(employee => {
                    return (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.login}</td>
                        <td>{employee.name}</td>
                        <td>{employee.salary}</td>
                    </tr>
                    )
                })
                
            }
            </tbody>
        </table>
    </div>
  );
};

export default EmployeeList;