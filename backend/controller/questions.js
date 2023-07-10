const pool = require("../db.js");
const redisClient = require("../redisConnection.js");
const util = require("util");
const { publishToQueue } = require("../rabbitmqCodes/producer.js");

redisClient.setex = util.promisify(redisClient.setex);
redisClient.get = util.promisify(redisClient.get);
redisClient.del = util.promisify(redisClient.del);
redisClient.exists = util.promisify(redisClient.exists);

const allQuestions = async (req, res) => {
    try {
        const questions = await pool.query("SELECT * FROM questions");
        res.status(200).json({questions: questions.rows});
    } catch (error) {
        console.log(error);
        res.status(401).json({error: error.message});
    }
}

const singleQuestion = async (req, res) => {
    try {
        const { question_id } = req.params;
        const response = await redisClient.get(question_id);
        if (response) {
            return res.status(200).json(JSON.parse(response));
        }
        const question = await pool.query("SELECT * FROM questions WHERE question_id = $1", [question_id]);
        const answer = await pool.query("SELECT * FROM answers WHERE question_id = $1", [question_id]);
        await redisClient.setex(question_id, "3600", JSON.stringify({question: question.rows[0], answer: answer.rows}));
        res.status(200).json({question: question.rows[0], answer: answer.rows});
    } catch (error) {
        console.log(error);
        res.status(401).json({error: error.message});
    }
}

const searchQuestions = async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.similar_title);
        const similarQuestions = await pool.query(`SELECT * FROM questions WHERE LOWER(data->>'title') LIKE '%'||$1||'%'`, [title.toLowerCase()]);
        res.status(200).json({questions: similarQuestions.rows})
    } catch (error) {
        console.log(error);
        res.status(401).json({error: error.message});
    }
}

const myQuestions = async (req, res) => {
    try {
        const user = JSON.parse(req.headers.user);
        const userQuestions = await pool.query(`SELECT * FROM questions WHERE author_id = $1`, [user.user_id]);
        res.status(200).json({questions: userQuestions.rows});
    } catch (error) {
        console.log("hi",error);
        res.status(401).json({error: error.message});
    }
}

const askQuestion = async (req, res) => {
    try {
        const user = JSON.parse(req.headers.user);
        const {title, description} = req.body;
        const postedQuestion = await pool.query("INSERT INTO questions (author_id, data, author_name) VALUES ($1, $2, $3) RETURNING *", [user.user_id, {title: title, description: description}, user.user_name]);
        res.status(200).json({question: postedQuestion.rows[0]});
    } catch (error) {
        console.log(error);
        res.status(401).json({error: error.message});
    }
}

const editQuestion = async (req, res) => {
    try {
        const user = JSON.parse(req.headers.user);
        const {question_id} = req.params;
        const {title, description} = req.body;
        const date = new Date();
        const editedQuestion = await pool.query("UPDATE questions SET data = $1, modified_at = $4 WHERE author_id = $2 AND question_id = $3 RETURNING *", [{title: title, description: description}, user.user_id, question_id, date]);
        const answer = await pool.query("SELECT * FROM answers WHERE question_id = $1", [question_id]);
        await redisClient.del(question_id);
        await redisClient.setex(question_id, "3600", JSON.stringify({question: editedQuestion.rows[0], answer: answer.rows}));
        res.status(200).json({question: editedQuestion.rows[0]});
    } catch (error) {
        console.log(error);
        res.status(401).json({error: error.message});
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const user = JSON.parse(req.headers.user);
        const {question_id} = req.params;
        const deletedQuestion = await pool.query("DELETE FROM questions WHERE question_id = $1 AND author_id = $2 RETURNING *", [question_id, user.user_id]);
        await redisClient.del(question_id);
        res.status(200).json({question: deletedQuestion.rows[0]});
    } catch (error) {
        console.log(error);
        res.status(401).json({error: error.message});
    }
}

const postAnswer = async (req, res) => {
    try {
        // parsing user to get user details
        const user = JSON.parse(req.headers.user);
        const user_name = user.user_name;
        // getting question id from request params
        const {question_id} = req.params;
        // getting answer content from request body
        const {content} = req.body;
        // creating a new answer
        const newAnswer = await pool.query("INSERT INTO answers (author_id, question_id, content, author_name) VALUES ($1, $2, $3, $4) RETURNING *", [user.user_id, question_id, content, user_name]);
        // getting question's author details to send email via rabbitmq
        const author = await pool.query("SELECT author_id FROM questions WHERE question_id = $1", [question_id]);
        const author_id = author.rows[0].author_id;
        const author_email_full = await pool.query(`SELECT user_email FROM users WHERE user_id = $1`, [author_id]);
        const author_email = author_email_full.rows[0].user_email;
        const question = await pool.query("SELECT * FROM questions WHERE question_id = $1", [question_id]);
        // updating cache for the question if it exists in redis
        if (redisClient.exists(question_id)){
            const answer = await pool.query("SELECT * FROM answers WHERE question_id = $1", [question_id]);
            await redisClient.del(question_id);
            await redisClient.setex(question_id, "3600", JSON.stringify({question: question.rows[0], answer: answer.rows}));
        }
        //publishing to rabbitmq queue
        publishToQueue("email-queue", {questionURL: `http://localhost:3000/question/${question_id}`, question_title: question.rows[0].data.title, content: content, author_email: author_email, answered_by: user_name});
        res.status(200).json({answer: newAnswer.rows[0]});
    } catch (error) {
        console.log(error);
        res.status(401).json({error: error.message});
    }
}

module.exports = {
    allQuestions, singleQuestion, searchQuestions, myQuestions, askQuestion, editQuestion, deleteQuestion, postAnswer
}