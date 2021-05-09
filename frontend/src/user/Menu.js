import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Signout, isAuthenticated } from '../auth/helper';

// APPLYING STYLES ON CURRENT TAB
const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#2ecc72"};
    } else {
        return {color: "#fff"};
    }
}

const Menu = ({history, path}) => {
    return (
        <div className="">
            <ul className="nav nav-tabs bg-dark">
                {/* home */}
                <div className="d-flex ml-auto">

                    {
                        isAuthenticated() ?
                        (
                            <>
                                <li className="nav-item">
                                    <Link to="/" 
                                        style={currentTab(history, "/")}
                                        className="nav-link">
                                        HOME
                                    </Link>
                                </li>
                                {/* cart */}
                                <li className="nav-item">
                                    <Link to="/user/cart" 
                                        style={currentTab(history, "/user/cart")}
                                        className="nav-link">
                                        CART
                                    </Link>
                                </li>

                                {/* dashboard */}
                                <li className="nav-item">
                                    <Link to="/user/dashboard" 
                                        style={currentTab(history, "/user/dashboard")}
                                        className="nav-link">
                                        DASHBOARD
                                    </Link>
                                </li>

                                {/* signout */}
                                <li className="nav-item"
                                    onClick={() => Signout(() => {
                                        history.push("/signin")
                                    })}
                                >
                                    <span className="nav-link text-warning">SIGNOUT</span>
                                </li>
                            </>
                        ):
                        (
                            <>
                                {/* signin */}
                                <li className="nav-item">
                                    <Link to="/signin" 
                                        style={currentTab(history, "/signin")}
                                        className="nav-link">
                                        SIGNIN
                                    </Link>
                                </li>



                                {/* signup */}
                                <li className="nav-item">
                                    <Link to="/signup" 
                                        style={currentTab(history, "/signup")}
                                        className="nav-link">
                                        SIGNUP
                                    </Link>
                                </li>
                            </>
                        )
                        
                    }
                </div>
            </ul>
        </div>
    );
};

export default withRouter(Menu);