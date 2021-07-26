import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { AuthContext } from '../App';
import { useHistory } from "react-router-dom";
import '../signupForm.css'

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
        ///////////hellothisemailand@lamduan.ac.th     
    } else if (!/^[A-Z 0-9 . _ % + -]+@[A-Z 0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.Password) {
        errors.Password = 'Required';
    } else if (!/^[A-Z 0-9]{8,20}$/i.test(values.Password)) {
        errors.Password = 'The Password must be 0-9 or A-Z more than 8 charaters but less than 20 characters';
    }

    return errors;
};

const LoginForm = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    function checkLogin(email, password) {


        const filterEmail = user.filter((item) => {
            return (item.email === email && item.password === password)
        })
        console.log('filter :', filterEmail)

        if (filterEmail.length === 1) {
            history.push("/Home")
            return alert("Login Success")
        } else {
            return alert("Email or password is not correct")
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            Password: '',
        },
        validate,
        onSubmit: values => {
            return checkLogin(values.email, values.Password)
        },
    });
    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}


                <label htmlFor="Password">Password</label>
                <input
                    id="Password"
                    name="Password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.Password}
                />
                {formik.errors.Password ? <div className="error">{formik.errors.Password}</div> : null}


                <button type="submit">Login</button>
                <button onClick={() => history.push("/SignupForm")} style={{ width: 200 }}>Signup</button>
            </form>
        </div>
    );
};

export default LoginForm;