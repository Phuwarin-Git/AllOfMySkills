import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { AuthContext } from '../App';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
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
    const formik = useFormik({
        initialValues: {
            email: '',
            Password: '',
        },
        validate,
        onSubmit: () => {
            alert("Hello")
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
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.Password}
                />
                {formik.errors.Password ? <div className="error">{formik.errors.Password}</div> : null}


                <button type="submit">Login</button>
                <button style={{ width: 200 }}>Signup</button>
            </form>
        </div>
    );
};

export default LoginForm;