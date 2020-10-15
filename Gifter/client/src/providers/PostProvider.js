import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");
    const [orderBy, setOrderBy] = useState("false");

    const apiUrl = "/api/post";
    const { getToken } = useContext(UserProfileContext);


    const getAllPosts = () => {
        //no http  = relative url.. urCurrentServer/api/post.. by going to our package.json and find the proxy host we provided (with http is absolute url)
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setPosts));
    };

    const getAllPostsWithComments = () => {
        getToken().then((token) =>
            fetch(`${apiUrl}/GetWithComments`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setPosts));
    };

    const getPost = (id) => {
        debugger
        return fetch(`${apiUrl}/GetWithComments/${id}`).then((res) => res.json());
    };

    const addPost = (post) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            })
                .then(getAllPosts))
    };


    const searchPosts = (searchTerms, orderBy) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/search?q=${searchTerms}&sortDesc=${orderBy}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                //.then(setPosts);
                .then(getAllPosts));
    };

    return (
        <PostContext.Provider value={{ posts, getAllPosts, getAllPostsWithComments, addPost, searchTerms, orderBy, setSearchTerms, searchPosts, getPost }}>
            {props.children}
        </PostContext.Provider>
    );
};