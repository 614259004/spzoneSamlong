import React from 'react'
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
import ManageProduct from './ManageProduct';
import ManageBrand from './ManageBrand';
import Fade from 'react-reveal/Fade';
import ManageCategory from './ManageCategory';
import ManageOrders from './ManageOrders';
import ManageCustomer from './ManageCustomer';
import Dashboard from './Dashboard';
import ManagePromotion from './ManagePromotion';
import AdminSidebar from "../components/AdminSidebar";
import '../css/AdminHome.css';


function Admin() {
    return (
        <div className="admin-layout-homepage">
         <Fade left>
            <Router>
                <AdminSidebar />
                <Switch>
                    <Route path='/Admin' exact  component={Dashboard} />    
                    <Route path='/Admin/ManageProduct'  component={ManageProduct} />
                    <Route path='/Admin/ManageBrand'   component={ManageBrand} />
                    <Route path='/Admin/ManageCategory'  component={ManageCategory} />
                    <Route path='/Admin/ManageOrders'  component={ManageOrders} />
                    <Route path='/Admin/ManagePromotion'  component={ManagePromotion} />
                    <Route path='/Admin/ManageCustomer'  component={ManageCustomer} />
                </Switch>
            </Router>
            </Fade>
        </div>
    )
}

export default Admin