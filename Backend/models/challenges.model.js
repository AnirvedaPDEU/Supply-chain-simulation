const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
    question_text: {
      type: String,
      required: true
    },
    options: [
      {
        option_text: {
          type: String,
          required: true
        },
        scores: {
          growing: {
            type: Number,
            required: true
          },
          established: {
            type: Number,
            required: true
          }
        },
        feedback: {
          growing: {
            type: String,
            required: true
          },
          established: {
            type: String,  
            required: true
          }
        }
      }
    ]
  },{timestamps:true});

  module.exports = mongoose.model("Challenges",challengeSchema)
  