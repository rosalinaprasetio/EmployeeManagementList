import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmployeeList from "./EmployeeList";
import UploadEmployee from "./UploadEmployee";

const Home = () => {
    return (
    <Router>
        <div>
          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={EmployeeList} />
              <Route exact path="/upload" component={UploadEmployee} />
            </Switch>
          </div>
        </div>
      </Router>
      );
}
 
export default Home;
