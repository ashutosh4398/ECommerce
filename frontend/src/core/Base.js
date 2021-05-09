import React from 'react';
import Menu from '../user/Menu';

const Base = ({
    title="My Title", 
    description="My description", 
    className="bg-dark text-white p-4",
    children
}) => {
    return (
        <div>
            <Menu />

            <div className="container-fluid flex-column justify-content-center">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">
                        {title}
                    </h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>
                    {children}
                </div>
                <footer className="footer bg-dark py-3 mt-auto">
                    <div className="container-fluid bg-success text-light py-3 text-center">
                        <h4>If you got any questions, mail us at ashutoshdhondkar@gmail.com</h4>
                        <button className="btn btn-warning btn-lg">
                            Contact Us
                        </button>
                        <div className="container">
                            <span className="text-white">
                                An Amazing Django React Full Stack Project
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Base;