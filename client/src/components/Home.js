import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import EmployeeList from "./EmployeeList";
import UploadEmployee from "./UploadEmployee";
import Dashboard from "./Dashboard";
import Layout from './Layout/Layout';

const Home = () => {
  return (
    <Router>
      <div>
        <div className="container mt-3">
          <Layout>
            <Switch>
              {/*<Route exact path="/" component={Dashboard} />*/}
              <Route exact path="/employee" component={EmployeeList} />
              <Redirect exact from="/" to="/employee" />
              <Route exact path="/upload" component={UploadEmployee} />
            </Switch>
          </Layout>
        </div>
      </div>
    </Router>
    );
}
 
export default Home;
