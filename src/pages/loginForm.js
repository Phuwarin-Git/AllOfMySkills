import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { AuthContext } from '../App';
import { useHistory } from "react-router-dom";
import '../signupForm.css'
import * as Yup from 'yup';

const LoginForm = () => {
    const { user, setCurrent } = useContext(AuthContext);
    const history = useHistory();
    function checkLogin(email, password) {

        const filterEmail = user.filter((item) => {
            return (item.email === email && item.password === password)
        })
        console.log('filter :', filterEmail)

        if (filterEmail.length === 1) {
            history.push("/Home")
            return <div>
                {setCurrent(filterEmail)}
                {alert("Login Success")}
            </div>

        } else {
            return alert("Email or password is not correct")
        }

    }

    const formik = useFormik({
        initialValues: {
            email: '',
            Password: '',
        },
        validationSchema: Yup.object({

            email: Yup.string().email('Invalid email address').required('Required'),
            Password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .max(30, 'Must be 30 characters or less')
                .matches(
                    /^.*((?=.*[a-z]){1})((?=.*[A-Z]){1})((?=.*[0-9]){1}).*$/,
                    "The password must be one uppercase, one lowercase and one number"
                )
                .required('Required'),
        }),
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
                <button className="sigupbut" onClick={() => history.push("/SignupForm")} style={{ width: 200 }}>Signup</button>
            </form>
        </div>
    );
};

export default LoginForm;