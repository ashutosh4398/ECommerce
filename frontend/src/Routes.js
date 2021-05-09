import React,{useState} from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './core/Home';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Signup from './user/Signup';
import UserDashboard from './user/UserDashboard';
import Signin from './user/Signin';
import Cart from './core/Cart';


const Routes = () => {
    return (        
        <Router>
            <Switch>
                <Route exact path="/signup" component={Signup} /> 
                <Route exact path="/signin" component={Signin} />
                <PrivateRoutes exact path="/" component={Home} />
                <PrivateRoutes exact path="/user/dashboard/" component={UserDashboard} />
                <PrivateRoutes exact path="/user/cart/" component={Cart} />
            </Switch>
        </Router>
    
    );
};

export default Routes;