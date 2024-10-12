require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helemt = require("helmet")
const morgan = require("morgan")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helemt());
app.use(morgan("dev"));

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





