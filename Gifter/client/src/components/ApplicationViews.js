import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import PostList from "./PostList";
import PostForm from "./PostForm";
//import PostWithComments from "./PostWithComments";
import PostDetails from "./PostDetails";
//import PostSearch from "./PostSearch";
import Login from "./Login";
import Register from "./Register";

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <PostList /> : <Redirect to="/Login" />}
            </Route>

            <Route path="/posts/add">
                {isLoggedIn ? <PostForm /> : <Redirect to="/Login" />}
            </Route>

            <Route path="/posts/:id">
                {isLoggedIn ? <PostDetails /> : <Redirect to="/Login" />}
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register />
            </Route>

        </Switch>
    );
};

export default ApplicationViews;