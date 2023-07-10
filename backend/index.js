const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./db.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CRON JOBS

require("./crons/detectBadWords.js");
require("./crons/checkExpiry.js");

// REDIS CONNECTION

require("./redisConnection.js");


// ROUTES 

const questionRoutes = require("./routes/questions.js");
const authRoutes = require("./routes/auth.js");

// DB CONNECTION

pool.connect(function (err) {
    if (err) throw err;
    else console.log(`DB Connected`);
})

// MIDDLEWARES
app.use(express.json());
app.use(cors());

app.use("/", authRoutes);
app.use("/", questionRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})
