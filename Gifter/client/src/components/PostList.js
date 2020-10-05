import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";
import PostWithComments from "./PostWithComments";
const PostList = () => {
    const { posts, getAllPosts, getAllPostsWithComments, searchTerms } = useContext(PostContext);

    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => { getAllPostsWithComments(); }, []);


    useEffect(() => {

        if (searchTerms !== "") {
            const titleSubSet = posts.filter(post => post.title.toLowerCase().includes(searchTerms))
            // const captionSubSet = posts.filter(post => post.caption.toLowerCase().includes(searchTerms))
            //const fullSubSet = `${titleSubSet}${captionSubSet}`

            setFilteredPosts(titleSubSet);

        } else {
            setFilteredPosts(posts);
        }
    }, [searchTerms, posts]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {filteredPosts.map((post) => (
                        <PostWithComments key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostList;