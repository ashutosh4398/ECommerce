import React,{useState} from 'react';
import Base from '../core/Base';
import {Link, Redirect, useHistory} from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false,
    });

    const history = useHistory()

    const {email, password, error, success,loading,didRedirect} = values;

    const handleChange = name =>
        event => {
            setValues({...values, error: false, [name]: event.target.value})
        }

    
    const onSubmit= event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true })
        signin({email, password})
            .then(resp => {
                const {data} = resp;
                if (data.access) {
                    authenticate(data, () => {
                        // ...
                    });
                    setValues({
                        ...values,
                        error: false,
                        didRedirect: true,
                        loading: false
                    })
                    history.push("/");
                } else {
                    setValues({...values, loading: false, didRedirect: false, error: true, success: false});
                }
            })
            .catch(error => {
                setValues({...values, loading: false, didRedirect: false, error: true, success: false});
            })
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

    const signinForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form onSubmit={onSubmit}>
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

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-infor text-bold">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    return (
        <Base
            title="Sign In page"
            description="Welcome to signin page"
        >
            {loadingMessage()}
            {errorMessage()}
            {signinForm()}
        </Base>
    );
};

export default Signin;