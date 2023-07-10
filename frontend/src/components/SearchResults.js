import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import MyQuestionCard from "./MyQuestionCard";

const SearchResults = () => {
    const location = useLocation();
    const searchTitle = location.state;
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const getSearchResults = async (searchTitle) => {
            const response = await axios.get(`http://localhost:5000/search/${encodeURIComponent(searchTitle)}`);
            setQuestions(response.data.questions);
        }
        getSearchResults(searchTitle);
    }, [searchTitle]);
    return (
        <>
        <div className = "container justify-center">
            {
                questions.length > 0 ? (
                <>
                    <h1 className = "text-center text-dark"> Search Results </h1>
                    <ul>
                        {questions.map(
                            question => (
                                <MyQuestionCard key = {question.question_id} props = {{question, isAllQuestions: true}} />
                        ))}
                    </ul>
                </>)
                : <h1 className = "text-center text-dark">No Results Found</h1>
            }
            
        </div>
        </>
    )
}

export default SearchResults;