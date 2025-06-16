import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        verifyPassword: "",
        phone: "",
        country: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setCredentials((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (credentials.password !== credentials.verifyPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await axios.post("/auth/register", {
                firstname: credentials.firstname,
                lastname: credentials.lastname,
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                phone: credentials.phone,
                country: credentials.country,
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="register">
            <div className="rContainer">
                <div className="rRow">
                    <input
                        type="text"
                        placeholder="Vorname"
                        name="firstname"
                        onChange={handleChange}
                        className="rInput"
                    />
                    <input
                        type="text"
                        placeholder="Nachname"
                        name="lastname"
                        onChange={handleChange}
                        className="rInput"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    className="rInput"
                />
                <div className="rRow">
                    <input
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        onChange={handleChange}
                        className="rInput"
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        onChange={handleChange}
                        className="rInput"
                    />

                </div>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="password"
                    placeholder="Verify Password"
                    name="verifyPassword"
                    onChange={handleChange}
                    className="rInput"
                />
                <button className="rButton" onClick={handleClick}>
                    Register
                </button>
                {error && <span className="rError">{error}</span>}
                {success && <span className="rSuccess">Registration successful!</span>}
                <div className="rAccount">
                    Already have an account?{" "}
                    <Link to="/login" className="rLoginLink">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;