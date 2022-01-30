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
        console.log(req.params);
        var skip = req.params.skip;
        var limit = req.params.limit;
        if (limit  == null) 
        {
            limit =10;
        }
        else{
            limit = parseInt(limit);
        }
        if(skip == null){
            skip = 0;
        }
        else{
            skip = parseInt(skip);
        }

        const results = await db.query("select *, (select team_name from team  where team_id = match.team1) as team_name1,(select team_name from team  where team_id = match.team2) as team_name2, (select team_name from team  where team_id = match.match_winner) as winner from match, venue where venue.venue_id = match.venue_id order by season_year desc, match_id asc, match.venue_id asc  offset $1 limit $2 ", [skip, limit]);
        // const results = await db.query("select *, (select team_name from team  where team_id = match.team1) as team_name1,(select team_name from team  where team_id = match.team2) as team_name2 from match, venue where venue.venue_id = match.venue_id order by season_year desc, match_id asc, match.venue_id asc  offset $1 limit 10 ", [offset]);
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
    console.log("HI")
    console.log(req.params);
    
    try {

        // const results = await db.query("select * from match where match_id = $1", [req.params.id]);

        const q1= `with T1 as
        (select striker, coalesce(sum(runs_scored),0)  as runs from ball_by_ball where match_id =  $1 and innings_no = $2 group by striker),
        T2 as 
        (select striker, count(*) as fours from ball_by_ball where match_id =  $1 and innings_no = $2 and runs_scored = 4 group by striker),
        T3 as 
        (select striker, count(*) as sixes from ball_by_ball where match_id =  $1 and innings_no = $2 and runs_scored = 6 group by striker),
        T4 as 
        (select striker, count(*) as balls_faced from ball_by_ball where match_id =  $1 and innings_no = $2  group by striker ), A as (
        select T1.striker, runs,coalesce( fours,0) as fours, coalesce( sixes,0) as sixs, balls_faced from T1 full outer join  T2 on T1.striker = T2.striker full outer join  T3 on Coalesce(T1.striker, T2.striker) = T3.striker full outer join  T4 on Coalesce(T1.striker, T2.striker, T3.striker) = T4.striker) select * from A, player where player_id = striker;`
        const innings1_batting = await db.query(q1, [req.params.id, 1]);
       const innings2_batting = await db.query(q1, [req.params.id, 2]);

        const q2 = `select coalesce(sum(runs_scored+ extra_runs),0)  as total_runs from ball_by_ball where match_id =  $1 and innings_no = $2;`
        const innings1_total_runs = await db.query(q2,[req.params.id, 1]);
        const innings2_total_runs = await db.query(q2,[req.params.id, 2]);
       const innings1_extra_runs =  await db.query(`select coalesce(sum(extra_runs),0) as extra_runs from ball_by_ball where match_id =  $1 and innings_no = $2;`,[req.params.id, 1])
       const innings2_extra_runs =  await db.query(`select coalesce(sum(extra_runs),0) as extra_runs from ball_by_ball where match_id =  $1 and innings_no = $2;`,[req.params.id, 2])

       const innings1_runsarray = await db.query(`with O as (select over_id,sum(runs_scored) as runs from ball_by_ball where match_id =  $1 and innings_no = $2 group by over_id order by over_id ) select over_id, sum(runs) over (order by over_id asc rows between unbounded preceding and current row) from O order by over_id;`,[req.params.id, 1])

       const pieplot =  await db.query(`with  B as (select * from ball_by_ball where match_id = $1 )
       , F as (select count (*)*4 as fours from B where runs_scored = 4),
        S as (select count (*)*6 as sixes from B where runs_scored = 6),
       E as (select coalesce(sum(extra_runs),0) as extra_runs from B ),
       O as (select count (*) as ones from B where runs_scored = 1),
       T as (select count (*) as twos from B where runs_scored = 2)
       select * from F,S,E,O,T;`,[req.params.id] )

       const battingOrder = await db.query(`with B as (
        select team_name as bat1 from match,team where match_id = $1 and ((((toss_winner = team1 and toss_name = 'bat') or (toss_winner = team2 and toss_name = 'field') ) and team_id = team1) or 
        (((toss_winner = team2 and toss_name = 'bat') or (toss_winner = team1 and toss_name = 'field') ) and team_id = team2)
        )
        ),
        C as (
        select team_name as bat2 from match,team where match_id = $1 and ((((toss_winner = team1 and toss_name = 'field') or (toss_winner = team2 and toss_name = 'bat') ) and team_id = team1) or 
        (((toss_winner = team2 and toss_name = 'field') or (toss_winner = team1 and toss_name = 'bat') ) and team_id = team2)
        )
        )
        select * from B, C;`,[req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                innings1_batting: innings1_batting.rows ,
                innings2_batting: innings2_batting.rows ,
                innings2_extra_runs: innings2_extra_runs.rows[0] ,
                innings1_extra_runs: innings1_extra_runs.rows[0] ,
                innings1_total_runs: innings1_total_runs.rows [0],
                innings2_total_runs: innings2_total_runs.rows[0],
                innings1_plot:innings1_runsarray.rows,
                pieplot: pieplot.rows[0],
                battingOrder : battingOrder .rows[0]

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
app.get("/venues", async (req, res)=>{

    try{
        const results = await db.query("select * from venue;");
        // console.log(results);
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
app.get("/venues/:id", async (req, res) => {
    console.log(req.params);
    
    try {
        const q1 = db.query("select * from venue where venue_id = $1;", [req.params.id]);
        const q2 = db.query("select count(*) from match, venue where match.venue_id = $1;", [req.params.id]);
        const q3 = db.query("With res as (select match.match_id, sum(runs_scored + extra_runs) as runs from ball_by_ball, match where ball_by_ball.match_id = match.match_id and match.venue_id = $1 group by match.match_id) select max(runs) as highest, min(runs) as lowest from res;", [req.params.id])
        const q4 = db.query("With res as (select match.match_id, sum(runs_scored + extra_runs) as runs1 from ball_by_ball, match where ball_by_ball.match_id = match.match_id and match.venue_id = $1 and innings_no = 1 group by match.match_id), res1 as (select match.match_id, sum(runs_scored + extra_runs) as runs2 from ball_by_ball, match where ball_by_ball.match_id = match.match_id and match.venue_id = $1 and innings_no = 2 group by match.match_id) select max(runs1) as highest from res, res1 where res.match_id = res1.match_id;", [req.params.id])
        const q5 = db.query("select count(*) from match where ((toss_name = 'bat' and match_winner = toss_winner) or (toss_name = 'field' and match_winner <> toss_winner)) and venue_id = $1;", [req.params.id]);
        const q6 = db.query("select count(*) from match where ((toss_name = 'bat' and match_winner <>toss_winner) or (toss_name = 'field' and match_winner = toss_winner)) and venue_id = $1;", [req.params.id]);
        const q7 = db.query("select count(*) from match where match_winner = -1 and venue_id = $1;", [req.params.id]);
        const q8 = db.query("with res as (select match.match_id, season_year, sum(runs_scored) from ball_by_ball, match where ball_by_ball.match_id = match.match_id and innings_no = 1 and venue_id = $1 group by match.match_id, season_year) select avg(sum), season_year from res group by season_year ;", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                r1: (await q1).rows[0], 
                r2: (await q2).rows[0],
                r3: (await q3).rows[0],
                r4: (await q4).rows[0],
                r5: (await q5).rows[0],
                r6: (await q6).rows[0],
                r7: (await q7).rows[0],
                r8: (await q8).rows
            }
        });
    }
    catch (err){
        console.log(err);
    }
    
});



app.post("/venues", async (req,res)=>{
    console.log(req.body);

    try{
        const results = await db.query("INSERT INTO venue (venue_id, venue_name, city_name, country_name, capacity) values (9991, $1, $2, $3, $4) returning *;",[req.body.name, req.body.location, req.body.city, req.body.capacity]);
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

// Get individual venues
app.get("/players/:id", async (req, res) => {
    console.log(req.params);
    
    try {
        const q1 = db.query("select * from player where player_id = $1;", [req.params.id]);
        const q2 = db.query("select count(distinct match_id) from ball_by_ball where ($1 = striker or $1 = non_striker);", [req.params.id]);
        const q3 = db.query("select sum(runs_scored) as runs, count(case when runs_scored = 4 then 1 end) as fours, count(case when runs_scored = 6 then 1 end) as sixes from ball_by_ball where striker = $1", [req.params.id])
        const q4 = db.query("With res as (select match_id, sum(runs_scored), count(*) as balls , count(out_type) as outs from ball_by_ball where striker = $1 group by match_id) select max(sum), count(case when sum >= 50 then 1 end), ROUND(100.0 * sum(sum) / sum(balls) * 1.0, 2) as strike_rate, ROUND(1.0 * sum(sum) / (case when sum(outs) > 0 then sum(outs) else 1 end) * 1.0, 2) as average from res;", [req.params.id])
        const q5 = db.query("with res as (select count(distinct match_id), count(out_type) as outs, count(*) as balls, sum(runs_scored + extra_runs), (count(case when ball_id<=6 then 1 end)-1)/6+1  as overs  from ball_by_ball where ($1 = bowler)) select count, outs, balls, sum, overs, ROUND((1.0*sum)/overs,2) as avg from res;", [req.params.id]);
        const q6 = db.query("with res as (select count(out_type), match_id from ball_by_ball where ($1 = bowler) group by match_id) select count(*) from res where count>= 5;", [req.params.id]);
        console.log(q1)
        res.status(200).json({
            status: "success",
            data: {
                r1: (await q1).rows[0], 
                r2: (await q2).rows[0],
                r3: (await q3).rows[0],
                r4: (await q4).rows[0],
                r5: (await q5).rows[0],
                r6: (await q6).rows[0]
            }
        });
    }
    catch (err){
        console.log(err);
    }
    
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});
