import React,{ useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import {isAuthenticated, signup} from '../auth/helper';


const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    // destructing state values so that they can be used directly
    const {name, email, password, error, success} = values;

    const handleChange = name =>
        event => {
            setValues({...values, error: false, [name]: event.target.value})
        }
    
    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values,error: false});
        signup({name, email, password})
            .then(resp => {
                if(resp.data?.email === email) {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
                else {
                    setValues({
                        ...values,
                        error: true,
                        success: false,
                    })
                }
            })
            .catch(err => {
                console.log(err.response);
                setValues({
                    ...values,
                    error: true,
                    success: false,
                })
            })
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success font-weight-bold"
                        style={{display: success ? "block": "none"}}
                    >
                        New Account created successfully. Please <Link to="signin/">login</Link> now.
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger font-weight-bold"
                        style={{display: error ? "block": "none"}}
                    >
                        There is some error. Please check all the fields
                    </div>
                </div>
            </div>
        )
    }

    const signupForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" placeholder="Enter name" value={name} onChange={handleChange("name")} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="text" placeholder="Enter email" value={email} onChange={handleChange("email")} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" placeholder="Enter password" value={password} onChange={handleChange("password")} className="form-control" />
                        </div>
                        <button className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    if (isAuthenticated()) {
        return <Redirect to="/" />
    }

    return (
        <Base title="Sign Up Page" description="A Signup for ecom user">
            {successMessage()}
            {errorMessage()}
            {signupForm()}
        </Base>
    );
};

export default Signup;