const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    team_id:{
        type: String,
        required: true,
        unique: true
    },
    team_name:{
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
    total_points:{
        type: Number,
        required: true,
        default:0
    },


},{timestamps:true})

module.exports = mongoose.model('Teams',teamSchema);  