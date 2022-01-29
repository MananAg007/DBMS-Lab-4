require("dotenv").config()
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());
var offset = 0;
// @T- /matches 
app.get("/matches", async (req, res)=>{

    try{
        const results = await db.query("select *, (select team_name from team  where team_id = match.team1) as team_name1,(select team_name from team  where team_id = match.team2) as team_name2 from match, venue where venue.venue_id = match.venue_id order by season_year desc, match_id asc, match.venue_id asc  offset $1 limit 10 ", [offset]);
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                matchList: results.rows 
            }     
        });
    } catch (err){
        console.log(err);
    }

});


// @T- /matches/id
app.get("/matches/:id", async (req, res)=>{
    console.log(req.params);
    
    try {
        const results = await db.query("select * from match where match_id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });
    }
    catch (err){
        console.log(err);
    }


});
//@T- pointstable, SECTION-D
app.get("/pointstable/:year", async (req, res)=>{
    console.log(req.params);
    
    try {
        const results = await db.query(`with M(mid) as (select match_id  from match where season_year =  $1),
        A as (select * from ball_by_ball natural join player_match where ball_by_ball.match_id in (select * from M) and ball_by_ball.match_id = player_match.match_id and player_id = striker) ,
         B as (select * from ball_by_ball natural join player_match where ball_by_ball.match_id in (select * from M) and ball_by_ball.match_id = player_match.match_id and player_id = bowler) ,
         T(tid,mid,runsScored, oversPlayed) as (
            select team_id,match_id, sum(runs_scored), count(distinct over_id) from A group by team_id,match_id
        ),
        OP(tid, mid,opponentRunsScored, opponentOversPlayed) as (
            select team_id,match_id, sum(runs_scored), count(distinct over_id) from B group by team_id,match_id
        ),
        N(tid, mid,val) as (
            select T.tid, T.mid, (T.runsScored*1.0/T.oversPlayed) - (OP.opponentRunsScored*1.0/opponentOversPlayed)
            from T natural join OP 
        ),  CountVals as (
        select team_id, 
        (select count(*) from match where match_winner = team_id) as won, 0 as tied,
         (select count(*) from match where team_id in (team1, team2)) as mat, (select 2*count(*) from match where match_winner = team_id) as pts
         from team),
        NRRVals (tid, NRR) as ( select tid, sum(val) from N group by tid),
        AllVals as (select * from NRRVals, CountVals where tid = team_id)
        select * , (mat - won- tied)  as lost from team, AllVals where team.team_id = tid order by pts desc;`, [req.params.year]);
    // console.log(results.data.data.matchInfo);
        res.status(200).json({
            status: "success",
            data: {
                pointsInfo: results.rows
            }
        });
    }
    catch (err){
        console.log(err);
    }


});

// Get all venues
app.get("/venue", async (req, res)=>{

    try{
        const results = await db.query("select * from venue");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                venue: results.rows 
            }     
        });
    } catch (err){
        console.log(err);
    }

});


// Get individual venues
app.get("/venue/:id", async (req, res) => {
    console.log(req.params);
    
    try {
        const results = await db.query("select * from venue where venue_id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                venue: results.rows[0]
            }
        });
    }
    catch (err){
        console.log(err);
    }
    
});


app.post("/venue", async (req,res)=>{
    console.log(req.body);

    try{
        const results = await db.query("INSERT INTO venue (venue_id, venue_name, city_name, country_name, capacity) values ($1, $2, 'NEW_CITY', 'NEW_COUNTRY', 50) returning *",[req.body.name, req.body.location]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                venue: results.rows[0]
            }
        });
    }catch (err) {
        console.log(err);
    }
    
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});