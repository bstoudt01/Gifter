//EXAMPLE FORM FROM CHAPTER 7 
// import React, { useState, useContext } from "react";
// import {
//     Form,
//     FormGroup,
//     Card,
//     CardBody,
//     Label,
//     Input,
//     Button,
// } from "reactstrap";
// import { PostContext } from "../providers/PostProvider";
// import { useHistory } from "react-router-dom";

// const PostForm = () => {
//     const { addPost } = useContext(PostContext);
//     const [userProfileId, setUserProfileId] = useState("");
//     const [imageUrl, setImageUrl] = useState("");
//     const [title, setTitle] = useState("");
//     const [caption, setCaption] = useState("");

//     // Use this hook to allow us to programatically redirect users
//     const history = useHistory();

//     const submit = (e) => {
//         const post = {
//             imageUrl,
//             title,
//             caption,
//             userProfileId: +userProfileId,
//         };

//         addPost(post).then((p) => {
//             // Navigate the user back to the home route
//             history.push("/");
//         });
//     };

//     return (
//         <div className="container pt-4">
//             <div className="row justify-content-center">
//                 <Card className="col-sm-12 col-lg-6">
//                     <CardBody>
//                         <Form>
//                             <FormGroup>
//                                 <Label for="userId">User Id (For Now...)</Label>
//                                 <Input
//                                     id="userId"
//                                     onChange={(e) => setUserProfileId(e.target.value)}
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="imageUrl">Gif URL</Label>
//                                 <Input
//                                     id="imageUrl"
//                                     onChange={(e) => setImageUrl(e.target.value)}
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="title">Title</Label>
//                                 <Input id="title" onChange={(e) => setTitle(e.target.value)} />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="caption">Caption</Label>
//                                 <Input
//                                     id="caption"
//                                     onChange={(e) => setCaption(e.target.value)}
//                                 />
//                             </FormGroup>
//                         </Form>
//                         <Button color="info" onClick={submit}>
//                             SUBMIT
//             </Button>
//                     </CardBody>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default PostForm;

import React, { useContext, useEffect, useState } from "react";
import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { useHistory } from "react-router-dom";

const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const [newPost, setNewPost] = useState([]);
    const history = useHistory();


    const handleFieldChange = evt => {
        console.log("what is the evt", evt)
        //anytime you have an event all of the stuff is passed along 
        //state to change set equal to value and pass it in
        //  brand is  inside our state, so any change to those values causes setBrand to run with stateToChange passed through
        // it watches you type into the input and holds onto that as stateToChange within brand useState.
        const stateToChange = { ...newPost };
        console.log("stateToChange newPost", stateToChange);
        stateToChange[evt.target.id] = evt.target.value;
        setNewPost(stateToChange)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPost.userId === "") {
            window.alert("Please input an user name to continue");
        } else {
            debugger
            const NewJoke = {

                userProfileId: parseInt(newPost.UserProfileId),
                title: newPost.Title,
                caption: newPost.Caption,
                imageUrl: newPost.ImageUrl,
            }
            console.log("newjoke", NewJoke);
            console.log("newPost state", newPost);
            addPost(NewJoke).then((p) => {
                // Navigate the user back to the home route
                history.push("/");
            });
        }
    }


    return (
        <Form>
            <FormGroup row>
                <Label lg={2}>UserId</Label>
                <Col>
                    <Input sm={5} lg={5} type="text" name="userId" id="UserProfileId" placeholder="enter user Id" onChange={handleFieldChange} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label lg={2}>Title</Label>
                <Col>
                    <Input sm={5} lg={5} type="text" name="title" id="Title" placeholder="enter title" onChange={handleFieldChange} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label lg={2}>Caption</Label>
                <Col>
                    <Input sm={5} lg={5} type="text" name="caption" id="Caption" placeholder="enter caption" onChange={handleFieldChange} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label lg={2}>Image</Label>
                <Col>
                    <Input sm={5} lg={5} type="Url" name="imageUrl" id="ImageUrl" placeholder="enter image url" onChange={handleFieldChange} />
                </Col>
            </FormGroup>

            <Button onClick={handleSubmit}>Submit</Button>
        </Form>
    );
}

export default PostForm;