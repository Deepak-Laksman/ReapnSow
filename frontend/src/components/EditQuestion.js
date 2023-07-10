import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const EditQuestion = () => {

    const user = localStorage.getItem("user");

    const location = useLocation();
    const question = location.state;

    const [title, setTitle] = useState(question.data.title);
    const [desc, setDesc] = useState(question.data.description);

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`http://localhost:5000/question/edit/${question.question_id}`, {title: title, description: desc}, {
                headers : {
                    user: user
                }
            })
            console.log(response);
            alert("Question edited successfully");
            window.location = "/myquestions";
        } catch (error) {
            console.log(error);
        }

    } 

    return (
        <>
            <div className = "container d-flex justify-content-center align-items-center" style = {{ marginTop: "20rem" }}>
                <form onSubmit = {submitHandler} style = {{ color: "black", width: "100%", height: "100%"}}>
                    <div className = "form-group">
                        <h1 className = "text-center">Edit Question</h1>
                    </div>
                    <div className="form-group">
                        <label htmlFor = "Title">Title</label>
                        <input style = {{ height: "3rem" }} type = "text" id = "title" className = "form-control" value = {title} onChange = {(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor = "Description">Description</label>
                        <textarea style = {{ height: "6rem" }} id = "Description" className = "form-control" value = {desc} onChange = {(e) => setDesc(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Edit</button>
                </form>
            </div>
        </>
    )
} 

export default EditQuestion;