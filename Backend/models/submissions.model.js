const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
        required: true
      },
      challenge_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenges',
        required: true
      },
      selected_option: {
        type: String,
        required: true
      },
      points_awarded: {
        type: Number
      },
},{timestamps:true})

module.exports = mongoose.model('Submissions',submissionSchema)