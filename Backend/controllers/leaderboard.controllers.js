const teamSchema = require('../models/teams.model')

const getLeaderboard = async(req,res)=>{
    try{
        let leaderboard = await teamSchema.find().sort({score:-1});

        let formattedLeaderboard = leaderboard.map(team => ({
            teamName: team.team_name,
            totalScore: team.score,
            totalTime: team.time_taken
        }));

        res.status(200).json(formattedLeaderboard)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Error fetching leaderboard"})
    }
}

module.exports = {getLeaderboard};  