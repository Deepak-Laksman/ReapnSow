const bcrypt = require("bcrypt-nodejs");
const pool = require("../db.js");

const loginHandler = async (req, res) => {
    try {
        const {user_email, user_password} = req.body;
        const users = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
        if (users.rows.length === 0)
            return res.status(200).json({message: "Incorrect Email"});
        bcrypt.compare(user_password, users.rows[0].user_password, async (err, ress) => {
            try {
                const { user_id, user_name, user_email } = users.rows[0];
                if (err) 
                return res.status(401).json({error: err.message});
                if (!ress) return res.status(200).json({message: "Incorrect Password"});
                res.status(200).json({user: {user_id, user_name, user_email}});
            } catch (errorr) {
                console.log("At bcrypt compare of loginHandler", errorr);
                res.status(401).json({error: errorr.message});
            }
        });
    } catch (error) {
        console.log("At Login Handler", error);
        res.status(401).json({error: error.message})
    }
}

const signupHandler = async (req, res) => {
    try {
        const {user_name, user_email, user_password} = req.body;
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        bcrypt.hash(user_password, salt, null, async (err, hash) => {
            if (err) return res.status(401).json({error: err.message})
            const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [user_name, user_email, hash]);
            res.status(200).json({message: "Signup Successful"});

        });
    } catch (error) {
        console.log("At Sign Up Hanlder", error);
        res.status(401).json({error: error.message});
    }
}

module.exports = {
    loginHandler,
    signupHandler,
}