import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");
    const [orderBy, setOrderBy] = useState("false");

    const apiUrl = "/api/post";
    const { getToken } = useContext(UserProfileContext);


    const getAllPosts = () => {
        //no http  = relative url.. urCurrentServer/api/post.. by going to our package.json and find the proxy host we provided (with http is absolute url)
        getToken().then((token) =>
            fetch("/api/post", {
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
            fetch("/api/post/GetWithComments", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setPosts));
    };

    const getPost = (id) => {
        return fetch(`/api/post/GetWithComments/${id}`).then((res) => res.json());
    };

    const addPost = (post) => {
        return fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then(getAllPosts)
    };


    const searchPosts = (searchTerms, orderBy) => {
        return fetch(`/api/post/search?q=${searchTerms}&sortDesc=${orderBy}`)
            .then((res) => res.json())
            //.then(setPosts);
            .then(getAllPosts);
    };

    return (
        <PostContext.Provider value={{ posts, getAllPosts, getAllPostsWithComments, addPost, searchTerms, orderBy, setSearchTerms, searchPosts, getPost }}>
            {props.children}
        </PostContext.Provider>
    );
};