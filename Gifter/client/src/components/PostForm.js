import React, { useContext, useEffect, useState } from "react";
import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { PostContext } from "../providers/PostProvider";

const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const [newPost, setNewPost] = useState([]);


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
                dateCreated: newPost.DateCreated
            }
            console.log("newjoke", NewJoke);
            console.log("newPost state", newPost);
            addPost(NewJoke);

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
            <FormGroup row>
                <Label lg={2}>Date</Label>
                <Col>
                    <Input sm={5} lg={5} type="date" name="date" id="DateCreated" onChange={handleFieldChange} />
                </Col>
            </FormGroup>
            <Button onClick={handleSubmit}>Submit</Button>
        </Form>
    );
}

export default PostForm;