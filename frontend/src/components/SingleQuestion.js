import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AnswerCard from "./AnswerCard";
import MyQuestionCard from "./MyQuestionCard";

const SingleQuestion = () => {

    const user = localStorage.getItem("user");

    const location = useLocation();
    const question = location.state;

    const [answers, setAnswers] = useState([]);

    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");

    const getAnswers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/question/${question.question_id}`);
            console.log(response.data.answer);
            setAnswers(response.data.answer);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAnswers();
    }, []);


    const postAnswer = () => {
        const submitHandler = async (e) => {
            try {
                e.preventDefault();
                const response = await axios.post(`http://localhost:5000/question/${question.question_id}/answer`, {content:content}, {
                    headers : {
                        user: user
                    }
                })
                console.log(response);
                getAnswers();
            } catch (error) {
                console.log(error)
            } 
            setShow(false);
        }
        return (
            <>
                <div style = {{ display: 'flex', flex: 1, width : '100%', height: '100%'}}>
                    <form onSubmit={submitHandler}>
                        <div style = {{ flex: 1, alignItems: "flex-start"}}>
                            <textarea style = {{ height: "15rem", width : "25rem"}} placeholder = "Type your answer here" value = {content} onChange = {(e) => setContent(e.target.value)} required/>
                        </div>
                        <div style = {{ flex: 1, alignItems: "flex-end"}}>
                            <button className = "btn btn-dark">Submit</button>
                        </div>
                    </form>
                </div>
                

            </>
        )
    }
    return (
        <>  
            <div className = "container justify-center">
                <MyQuestionCard key = {question.question_id} props = {{question, isAllQuestions: true}} />
                {user ? show ? postAnswer() : <button className = "text-center btn btn-primary" onClick = {() => setShow(true)}>Add Answer</button> : null}

            </div>
            <br />
            <div className = "container justify-right">
                <ul>
                    {answers ? answers.map(answer => 
                        (<>
                            <AnswerCard key = {answer.answer_id} props = {answer} />
                        </>)) 
                    : null }
                </ul>
            </div>
        </>
    )
}

export default SingleQuestion;