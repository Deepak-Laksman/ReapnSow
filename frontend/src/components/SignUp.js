import React, {useState, Fragment} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post("http://localhost:5000/register", {user_name: name, user_email: email, user_password: password});
            console.log(response.data.message);
            alert(response.data.message);
            window.location = "/";
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Fragment>
            <div className = "container d-flex justify-content-center align-items-center" style = {{ marginTop: "10rem"}}>
            <Card style = {{ border: 'none', backgroundColor: "#f4f4f4", padding: "3rem"}}>
            <form onSubmit = {submitHandler} style = {{ color: "black "}}>
                <div className = "form-group">
                    <h3 className = "text-center">Sign Up</h3>
                </div>
                <div className = "form-group">
                    <label for = "Name">Name</label>    
                    <input type = "text" id = "Name" className = "form-control" value = {name} onChange = {(e) => setName(e.target.value)} required/>                
                </div>
                <div className = "form-group">
                    <label htmlFor = "Email">Email</label>
                    <input type = "text" id = "Email" className = "form-control" value = {email} onChange = {(e) => setEmail(e.target.value)} required/>
                </div>
                <div className = "form-group">
                    <label htmlFor = "Password">Password</label>
                    <input type = "password" id = "Password" className = "form-control" value = {password} onChange = {(e) => setPassword(e.target.value)} required/>
                </div>
                <div className = "form-group">
                    <button type = "submit" className = "btn btn-primary">Register</button>
                </div>
                <div className = "form-group">
                    <p>Already have an account? <Link to = "/login"><button className = "btn btn-primary">Login</button></Link></p>
                </div>
            </form>
            </Card>
            </div>
        </Fragment>
    )
}

export default SignUp;