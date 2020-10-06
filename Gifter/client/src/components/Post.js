import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import PostComment from "./PostComment";

const Post = ({ post }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">Posted by: {post.userProfile.name}</p>
            <CardImg top src={post.imageUrl} alt={post.title} />
            <CardBody>
                <p>
                    <strong>{post.title}</strong>
                </p>
                <p>{post.caption}</p>
                {/* <div className="cards-column">
                    {post.comments?.map((comment) => (
                        <PostComment key={comment.id} comment={comment} />
                    ))}
                </div> */}
            </CardBody>

        </Card>
    );
};

export default Post;