import React from 'react';
import { useFormik } from 'formik';
import '../signupForm.css'

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
    const errors = {};
    if (!values.userName) {
        errors.userName = 'Required';
    } else if (values.userName.length < 4) {
        errors.userName = 'The username must be more than 4 characters';
    }

    if (!values.email) {
        errors.email = 'Required';
        ///////////hellothisemailand@lamduan.ac.th     
    } else if (!/^[A-Z 0-9 . _ % + -]+@[A-Z 0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.Password) {
        errors.Password = 'Required';
    } else if (values.Password.length < 8) {
        errors.Password = 'The password must be more than 8 characters';
    }

    return errors;
};

const SignupForm = () => {
    // Pass the useFormik() hook initial form values, a validate function that will be called when
    // form values change or fields are blurred, and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            Password: '',
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="userName">Username</label>
            <input
                id="userName"
                name="userName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.userName}
            />
            {formik.errors.userName ? <div className="error">{formik.errors.userName}</div> : null}

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


            <button type="submit">Submit</button>
        </form>
    );
};

export default SignupForm;