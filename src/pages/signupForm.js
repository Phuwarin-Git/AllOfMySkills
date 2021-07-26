import React, { useContext } from 'react';
import { useFormik } from 'formik';
import '../signupForm.css'
import { AuthContext } from '../App';
import { useHistory } from "react-router-dom";

function uniqueID() {
    function chr4() {
        return Math.random().toString(16).slice(-4);
    }
    return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}

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
    } else if (!/^[A-Z 0-9]{8,20}$/i.test(values.Password)) {
        errors.Password = 'The Password must be 0-9 or A-Z more than 8 charaters but less than 20 characters';
    }

    return errors;
};

const SignupForm = () => {
    const { user, setUser } = useContext(AuthContext);
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            Password: '',
        },
        validate,
        onSubmit: values => {
            history.push('/')
            setUser([...user, { id: uniqueID(), username: values.userName, email: values.email, password: values.Password }])

        },
    });
    return (
        <div>
            <h1>Register Form</h1>
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


                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default SignupForm;