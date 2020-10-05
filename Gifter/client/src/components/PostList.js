import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
    const { posts, getAllPosts, searchTerms } = useContext(PostContext);

    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => { getAllPosts(); }, []);


    useEffect(() => {

        if (searchTerms != "") {
            const subSet = posts.filter(post => post.title.toLowerCase().includes(searchTerms))
            // const commentSubSet = posts.filter(post => post.comments ? post.comments.toLowerCase().includes(searchTerms))
            //const fullSubSet = `${subSet}${commentSubSet}`

            setFilteredPosts(subSet);

        } else {
            setFilteredPosts(posts);
        }
    }, [searchTerms, posts]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {filteredPosts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostList;