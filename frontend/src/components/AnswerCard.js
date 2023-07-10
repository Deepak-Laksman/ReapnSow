import React from "react";
import Card from 'react-bootstrap/Card';

const AnswerCard = (answer) => {
    console.log(answer);
    const {content, author_name, question_id, created_at, modified_at} = answer.props;
    return (
        <Card style = {{ marginBottom: "3rem", marginTop: "3rem", backgroundColor: "#f4f4f4" }}>
            <Card.Body>
                <p>{content}</p>
                <footer className="blockquote-footer text-dark">{author_name}</footer>
                <div style = {{ flex: 1, textAlign: "right"}}>
                    <Card.Link>{modified_at ? modified_at.toString().slice(0, 10) : created_at.toString().slice(0, 10)}</Card.Link>
                </div>    
            </Card.Body>

        </Card>
    )
}

export default AnswerCard;