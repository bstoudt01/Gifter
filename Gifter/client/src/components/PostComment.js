import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";

const PostComment = ({ comment }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">User: {comment.userProfile.name}</p>
            <p className="text-left px-2">comment: {comment.message}</p>

        </Card>
    );
};

export default PostComment;