import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");
    const [orderBy, setOrderBy] = useState("false");

    const getAllPosts = () => {
        //no http  = relative url.. urCurrentServer/api/post.. by going to our package.json and find the proxy host we provided (with http is absolute url)
        return fetch("/api/post")
            .then((res) => res.json())
            .then(setPosts);
    };

    const getAllPostsWithComments = () => {
        //no http  = relative url.. urCurrentServer/api/post.. by going to our package.json and find the proxy host we provided (with http is absolute url)
        return fetch("/api/post/GetWithComments")
            .then((res) => res.json())
            .then(setPosts);
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
        return fetch(`/api/post/search?q=${searchTerms}sortDesc=${orderBy}`)
            .then((res) => res.json())
            //.then(setPosts);
            .then(getAllPosts);
    };

    return (
        <PostContext.Provider value={{ posts, getAllPosts, getAllPostsWithComments, addPost, searchTerms, orderBy, setSearchTerms, searchPosts }}>
            {props.children}
        </PostContext.Provider>
    );
};