import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignUpForm.css"

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === confirmPassword){
            setErrors([]);
            
            let user = {email, password, firstName, lastName};

            return dispatch(sessionActions.signup(user))
                .catch(async(res) => {
                    const data = await res.json();
                    if(data && data.errors) setErrors(data.errors);
                })
        };
        return setErrors(["Incorrect password, please try again"])
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <ul>
                {errors.map((error, idx) => <li key={idx}>
                    {error}
                </li>)}
            </ul>
            <label>
                  fg
            </label>
        </form>
    )
}