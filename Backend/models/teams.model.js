const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    team_name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    team_members:{
        type: [String],
        required: true
    },
    category:{
        type: String,
        required: true,
        enum:['growing','established']
    },
    score:{
        type: Number,
        required: true,
        default:0
    },


},{timestamps:true})

module.exports = mongoose.model('Teams',teamSchema);  