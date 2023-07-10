import React, {useState} from "react";
import axios from "axios";

const AskQuestion = () => {

    const user = localStorage.getItem("user");

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`http://localhost:5000/ask`, {title: title, description: desc}, {
                headers: {
                    user: user
                }
            });
            console.log(response.data);
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
                        <h1 className = "text-center" >Ask Question</h1>
                    </div>
                    <div className="form-group">
                        <label htmlFor = "Title">Title</label>
                        <input style = {{ height: "3rem" }} type = "text" id = "Title" className = "form-control" value = {title} onChange = {(e) => setTitle(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor = "Description">Description</label>
                        <textarea style = {{ height: "6rem" }} id = "Description" className = "form-control" value = {desc} onChange = {(e) => setDesc(e.target.value)} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </>

    )
}

export default AskQuestion;