const express = require("express");
const { allQuestions, singleQuestion, searchQuestions, myQuestions, askQuestion, editQuestion, deleteQuestion, postAnswer} = require("../controller/questions.js");

const router = express.Router();

router.get("/", allQuestions);
router.get("/myquestions", myQuestions);
router.get("/question/:question_id", singleQuestion);
router.get("/search/:similar_title", searchQuestions);
router.post("/ask", askQuestion);
router.put("/question/edit/:question_id", editQuestion);
router.delete("/question/:question_id", deleteQuestion);

router.post("/question/:question_id/answer", postAnswer);


module.exports = router;