require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet")
const morgan = require("morgan")
const challengeRouter = require('./routes/challenges.routes');
const teamRouter = require('./routes/teams.routes')
const submissionRouter = require('./routes/submissions.routes');
const leaderBoardRouter = require('./routes/leaderboard.routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/challenge",challengeRouter)
app.use("/api/teams",teamRouter)
app.use("/api/submit",submissionRouter)
app.use("/api/leaderboard",leaderBoardRouter)



mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 5000;
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`Server is running on port ${port}`);
        });
}).catch((err)=>{
    console.log(err);
})





