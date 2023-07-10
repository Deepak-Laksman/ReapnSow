import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MyQuestionCard from "./MyQuestionCard";

const MyQuestions = () => {

    const [questions, setQuestions] = useState([]);
    const user = localStorage.getItem("user");

    const getUserQuestions = async () => {
        const response = await axios.get("http://localhost:5000/myquestions", {
            headers : {
                user : user
            }
        });
        setQuestions(response.data.questions);
    }

    useEffect(() => {
        getUserQuestions();
    }, [])

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
        <>
            <div className = "container justify-center">
                <h1 className = "text-center text-dark"> Your Questions </h1>
                <ul>
                    {questions.map(
                        question => (
                            <MyQuestionCard key = {question.question_id} props = {{question, isAllQuestions: false, setQuestions}} />
                    ))}
                </ul>
            </div>
        </>
    )
} 

export default MyQuestions;