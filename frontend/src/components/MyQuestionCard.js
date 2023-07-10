import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import axios from "axios";

const MyQuestionCard = (question) => {

    const user = localStorage.getItem("user");

    const {question_id, data, author_name, created_at, modified_at} = question.props.question;
    const setQuestions = question.props.setQuestions; 
    const isAllQuestions = question.props.isAllQuestions;

    const getUserQuestions = async () => {
    const response = await axios.get("http://localhost:5000/myquestions", {
            headers : {
                user : user
            }
        });
        setQuestions(response.data.questions);
    }

    const deleteQuestion = async (question_id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/question/${question_id}`, {
                headers: {
                    user: user
                }
            });
            console.log(response);
            alert("Question deleted successfully");
            getUserQuestions();
        } catch (error) {
            console.log(error);
        }
    }
    return (
      <Card style={{ marginBottom: "3rem", marginTop: "3rem", backgroundColor: "#f4f4f4" }} >
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-dark">{author_name}</Card.Subtitle>
        <br />
        <Card.Text>
          {data.description}
        </Card.Text>
        <div style = {{ display: 'flex', flex: 1, width : '100%'}}>
            <div style = {{ flex: 1, alignItems: "flex-start"}}>
                <Link to = "/question" className = "text-primary" state = {question.props.question}>View more</Link>
            </div>  
            <div style = {{ flex: 1, textAlign: "right"}}>
                <Card.Link>{modified_at ? modified_at.toString().slice(0, 10) : created_at.toString().slice(0, 10)}</Card.Link>
            </div>            
        </div>
        {
            !isAllQuestions 
            ? 
            <>
                <br />
                <div style = {{ display: 'flex', flex: 1, width : '100%'}}>
                <div style = {{ flex: 1, alignItems: "flex-start"}}> 
                <Link to = "/question/edit" style= {{ textDecoration: 'none' }} state = {question.props.question}> <button className = "btn btn-primary"> EDIT </button> </Link> 
                </div>
                <div style = {{ flex: 1, textAlign: "right"}}> 
                <Card.Link> <button className = "btn btn-danger" onClick = {() => deleteQuestion(question_id)}> DELETE </button> </Card.Link> 
                </div>
                </div>
            </>
            : null
        }
        
      </Card.Body>
    </Card>
    )
}

export default MyQuestionCard;