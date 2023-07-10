const pool = require("../db.js");
const cron = require("node-cron");

async function checkExpiryToDelete() {
    let date = new Date();
    const questions = await pool.query("SELECT * FROM todelete WHERE expiry_time < $1", [date]);
    console.log(questions.rows);
    const length = questions.rows.length;
    for (let i = 0; i < length; i++) {
        const deletedQuestion = await pool.query("DELETE FROM questions WHERE question_id = $1 RETURNING *", [questions.rows[i].question_id]);
        console.log("Check Expiry", deletedQuestion);
    }   
}

cron.schedule("08 07 * * *", checkExpiryToDelete);
