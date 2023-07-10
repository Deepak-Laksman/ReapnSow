import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MyQuestionCard from "./MyQuestionCard";

const AllQuestions = () => {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const getAllQuestions = async () => {
            const response = await axios.get("http://localhost:5000/");
            setQuestions(response.data.questions);
        }
        getAllQuestions();
    }, [])

    return (
        <>
        <div className = "container justify-center">
            <h1 className = "text-center text-dark"> All Questions </h1>
                <ul>
                    {questions.map(
                        question => (
                            <MyQuestionCard key = {question.question_id} props = {{question, isAllQuestions: true}} />
                    ))}
                </ul>
        </div>
            
        </>
    )
} 

export default AllQuestions;