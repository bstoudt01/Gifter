import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

const Header = () => {
    const { isLoggedIn, logout } = useContext(UserProfileContext);

    return (
        <nav className="navbar navbar-expand navbar-dark bg-info">
            {!isLoggedIn &&
                <>
                    <Link to="/login" className="navbar-brand">
                        Login
      </Link>
                    <Link to="/register" className="navbar-brand">
                        Register
      </Link>
                </>}


            {isLoggedIn &&
                <>
                    <Link to="/" className="navbar-brand">
                        GiFTER
                </Link>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Feed
          </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/posts/add" className="nav-link">
                                New Post
          </Link>
                        </li>
                    </ul>
                    <a aria-current="page" className="nav-link"
                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </>
            }
        </nav>
    );
};

export default Header;