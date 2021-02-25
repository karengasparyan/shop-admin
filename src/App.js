import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom';
import Error404 from './pages/Error404';
import Login from "./pages/Login";
import CreateUpdate from "./pages/CreateUpdate";
import DataTables from "./pages/DataTables";
import OrderList from "./pages/OrderList";
import { ToastContainer } from "react-toastify";
import {Menu, MenuItem} from "react-pro-sidebar";
import FiltersAndSlider from "./pages/FiltersAndSlider";

class App extends Component {
  render() {
    const contextClass = {
      success: "toastSuccess",
      error: "toastError",
      info: "toastInfo",
      warning: "toastWarning",
      default: "toastDefault",
      dark: "toastDark toastDarkBlue",
    };
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={OrderList} />
            <Route path="/admin/sign-in" exact component={Login} />
            <Route path="/admin/data-tables" exact component={DataTables} />
            <Route path="/admin/filters-slider" exact component={FiltersAndSlider} />
            <Route path="/admin/create" component={CreateUpdate} />
            <Route path="/admin/update/:id" exact component={CreateUpdate} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          closeButton={false}
          bodyClassName="toastBody"
          toastClassName={({ type }) => contextClass[type || "default"] +
            " flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          }
        />
      </>
    );
  }
}

export default App;
