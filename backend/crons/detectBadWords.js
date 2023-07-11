const cron = require("node-cron");
const pool = require("../db.js");
const fs = require("fs");

const data = fs.readFileSync(__dirname + '/badwords.txt',
    { encoding: 'utf8', flag: 'r' }).split("\n");

const badWords = new Set();
for (let word of data) badWords.add(word);

const detectQuestions = async () => {
    const questions = await pool.query("SELECT question_id, data FROM questions");
    const length = questions.rows.length;
    for (let i = 0; i < length; i++) {
        const title_words = questions.rows[i].data.title.split(" ");
        let flag = false;
        for (let word of title_words) {
            if (badWords.has(word.toLowerCase())) {
                flag = true;
                break;
            }
        }
        if (flag) {
            let date = new Date();
            date.setHours(date.setHours() + 24);
            const addedQuestion = await pool.query("INSERT INTO todelete (question_id, expiry_time) VALUES ($1, $2) RETURNING *", [questions.rows[i].question_id, date]);
            console.log(addedQuestion);
            continue;
        } else {
            const description_words = questions.rows[i].data.title.split(" ");
            for (let word of description_words) {
                if (badWords.has(word.toLowerCase())) {
                    flag = true;
                    break;
                }
            }
        }
        if (flag) {
            let date = new Date()
            date.setHours(date.getHours() + 24);
            const addedQuestion = await pool.query("INSERT INTO todelete (question_id, expiry_time) VALUES ($1, $2) RETURNING *", [questions.rows[i].question_id, date]);
            // console.log(addedQuestion);
        }

    }
}

cron.schedule("30 08 * * *", detectQuestions);