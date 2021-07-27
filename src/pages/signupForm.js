import React, { useContext } from 'react';
import { useFormik } from 'formik';
import '../signupForm.css'
import { AuthContext } from '../App';
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';


const SignupForm = () => {
    const { user, setUser } = useContext(AuthContext);
    const history = useHistory();

    function CheckEmail(username, email, password) {

        const filterEmail = user.filter((item) => {
            return (item.email === email)
        })
        console.log('filter :', filterEmail)

        if (filterEmail.length === 1) {
            alert("This email address is already used")
        }
        else {
            setUser([...user, { id: user.length + 1, username: username, email: email, password: password }])
            alert("Register success", email)
            history.push('/')

        }

    }

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            Password: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(4, 'Must be 4 characters or more')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address')
                .required('Required'),
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
            CheckEmail(values.userName, values.email, values.Password)
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