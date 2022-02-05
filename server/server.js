require("dotenv").config()
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const { query } = require("express");
const app = express();

app.use(cors());
app.use(express.json());
// var offset = 0;
// @T- /matches 
app.get("/matches", async (req, res)=>{

    try{
        console.log(req.params);
        // var skip = req.params.skip;
        // var limit = req.params.limit;
        // if (limit  == null) 
        // {
        //     limit =10;
        // }
        // else{
        //     limit = parseInt(limit);
        // }
        // if(skip == null){
        //     skip = 0;
        // }
        // else{
        //     skip = parseInt(skip);
        // }
        

        const results = await db.query("select *, (select team_name from team  where team_id = match.team1) as team_name1,(select team_name from team  where team_id = match.team2) as team_name2, (select team_name from team  where team_id = match.match_winner) as winner from match, venue where venue.venue_id = match.venue_id order by season_year desc, match_id asc, match.venue_id asc ;");
        // const results = await db.query("select *, (select team_name from team  where team_id = match.team1) as team_name1,(select team_name from team  where team_id = match.team2) as team_name2 from match, venue where venue.venue_id = match.venue_id order by season_year desc, match_id asc, match.venue_id asc  offset $1 limit 10 ", [offset]);
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                matchList: results.rows,
                matchescount:  results.rowCount
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
        const total_overs = await db.query("select distinct over_id from ball_by_ball where match_id = $1 order by over_id;", [req.params.id]);
        const overs1 = await db.query("select max(over_id) from ball_by_ball where match_id = $1 and innings_no = 1;", [req.params.id]);
        const overs2 = await db.query("select max(over_id) from ball_by_ball where match_id = $1 and innings_no = 2;", [req.params.id]);
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

       const innings1_runsarray = await db.query(`with O as (select over_id,sum(runs_scored+extra_runs) as runs from ball_by_ball where match_id =  $1 and innings_no = $2 group by over_id order by over_id ) select over_id, sum(runs) over (order by over_id asc rows between unbounded preceding and current row) from O order by over_id;`,[req.params.id, 1])
       const innings2_runsarray = await db.query(`with O as (select over_id,sum(runs_scored+extra_runs) as runs from ball_by_ball where match_id =  $1 and innings_no = $2 group by over_id order by over_id ) select over_id, sum(runs) over (order by over_id asc rows between unbounded preceding and current row) from O order by over_id;`,[req.params.id, 2])


    const q3= `with  B as (select * from ball_by_ball where match_id = $1 and innings_no = $2 )
    , F as (select count (*)*4 as fours from B where runs_scored = 4),
     S as (select count (*)*6 as sixes from B where runs_scored = 6),
    E as (select coalesce(sum(extra_runs),0) as extra_runs from B ),
    O as (select count (*) as ones from B where runs_scored = 1),
    T as (select count (*) as twos from B where runs_scored = 2)
    select * from F,S,E,O,T;`;
       const pieplot =  await db.query(q3,[req.params.id,1] )
       const pieplot2 =  await db.query(q3,[req.params.id,2] )

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


        const q5 = `with T1 as
        (select bowler, coalesce(sum(runs_scored),0)  as runs_given from ball_by_ball where match_id =  $1 and innings_no = $2 group by bowler),
        T2 as 
        (select bowler, coalesce(count(*),0)  as wickets from ball_by_ball where match_id =  $1 and innings_no = $2  and out_type is not null group by bowler),
        T3 as 
        (select bowler, coalesce(count(distinct ball_id),0)  as balls_bowled from ball_by_ball where match_id =  $1 and innings_no = $2  group by bowler),
        T4 as  (select T1.bowler as bowler_id , coalesce(runs_given,0) as runs_given,  coalesce(wickets, 0) as wickets , coalesce(balls_bowled, 0) as balls_bowled from T1 full outer join  T2 on T1.bowler = T2.bowler  full outer join  T3 on Coalesce(T1.bowler , T2.bowler ) = T3.bowler )
        select * from T4, player where player_id = bowler_id;`
        const innings1_bowling = await db.query(q5, [req.params.id, 1]);
        const innings2_bowling = await db.query(q5, [req.params.id, 2]);
 
        const q6 = `select coalesce(count(out_type),0) as total_wickets from ball_by_ball where  match_id =  $1 and innings_no = $2 ;  `
        const innings1_total_wickets = await db.query(q6, [req.params.id, 1]);
        const innings2_total_wickets= await db.query(q6, [req.params.id, 2]);
        
        
        const q7 = `select * from match where match_id = $1; `;
        const info = await db.query(q7, [req.params.id]);
        const q8 = `select * from venue, match where match.venue_id = venue.venue_id and  match_id = $1;` 
        const venue= await db.query(q8, [req.params.id]);
        const q9 = `select player_name from player as P, player_match as PM, match as M where M.match_id = PM.match_id and PM.team_id = team1 and P.player_id  = PM.player_id and  M.match_id = $1; `;
        const q10 = `select player_name from player as P, player_match as PM, match as M where M.match_id = PM.match_id and PM.team_id = team2 and P.player_id  = PM.player_id and M. match_id = $1; `;
        const player1= await db.query(q9, [req.params.id]);
        const  player2 = await db.query(q10, [req.params.id]);
  const q11 =`select umpire_name from umpire U, umpire_match UM where UM.umpire_id = U.umpire_id and  match_id = $1; `;
        const umpires = await db.query(q11, [req.params.id]);


        const q12 = `select team_name as name from team, match where toss_winner = team_id and match_id = $1;`;
        const TossWinner = await db.query(q12, [req.params.id]);


        const q13 = `with A(team_name1) as (select team_name from team,match where team_id = team1 and match_id = $1 ),
        B(team_name2) as (select team_name from team,match where team_id = team2 and match_id = $1 )
        select * from A, B;
        `
        const Teamnames = await db.query(q13, [req.params.id]);

        const q14 = `with A as (select player_name,striker, count(*) as num_balls, coalesce (sum(runs_scored+ extra_runs),0) as runs_scored from ball_by_ball, player where match_id =  $1 and innings_no = $2 and player_id = striker group by striker, player_name) 
        select * from A where num_balls > 0  order by runs_scored desc, num_balls asc, player_name asc limit 3;
        
        `
        const TopBatters1 = await  db.query(q14, [req.params.id, 1]);
        const TopBatters2 = await  db.query(q14, [req.params.id, 2]);

        const q15 = `with A as (select player_name, bowler, count(out_type) as wickets_taken, coalesce (sum(runs_scored),0) as runs_given from ball_by_ball, player where match_id =  $1 and innings_no = $2 and player_id = bowler group by bowler, player_name) 
        select * from A where wickets_taken > 0  order by  wickets_taken desc , runs_given , player_name asc limit 3;
        
        `
        const TopBowlers1 = await  db.query(q15, [req.params.id, 1]);
        const TopBowlers2 = await  db.query(q15, [req.params.id, 2]);



        const q16 = `with O as (select over_id,sum(runs_scored+extra_runs) as runs from ball_by_ball where match_id =  $1 and innings_no = $2 group by over_id order by over_id ), B as(select over_id, sum(runs) over (order by over_id asc rows between unbounded preceding and current row) from O order by over_id), M as (select over_id from ball_by_ball where match_id =  $1 and innings_no = $2 and out_type is not null) select * from B where over_id in (select * from M) order by over_id;`;
        
        const innings1_scatter = await db.query(q16,  [req.params.id, 1]);
        const innings2_scatter = await db.query(q16,  [req.params.id, 2]);

        const winnername = await db.query(`select team_name from team, match where match_id = $1 and team_id = match_winner`, [req.params.id])
                res.status(200).json({
            status: "success",
            data: {
                winnername : winnername.rows[0],
                TopBowlers1:TopBowlers1.rows,
                TopBowlers2: TopBowlers2.rows,
                TopBatters1: TopBatters1.rows,
                TopBatters2: TopBatters2.rows,
                TossWinner: TossWinner.rows[0],
                info : info.rows[0],
                venue: venue.rows[0],
                player1: player1.rows,
                player2: player2.rows,
                Teamnames: Teamnames.rows[0],
                umpires: umpires.rows,
                innings1_batting: innings1_batting.rows ,
                innings2_batting: innings2_batting.rows ,
                innings1_bowling : innings1_bowling.rows,
                innings2_bowling :innings2_bowling.rows,
                innings2_extra_runs: innings2_extra_runs.rows[0] ,
                innings1_extra_runs: innings1_extra_runs.rows[0] ,
                innings1_total_runs: innings1_total_runs.rows [0],
                innings2_total_runs: innings2_total_runs.rows[0],
                innings1_plot:innings1_runsarray.rows,
                innings2_plot:innings2_runsarray.rows,
                innings1_scatter: innings1_scatter.rows,
                innings2_scatter: innings2_scatter.rows,
                innings2_total_wickets :innings2_total_wickets.rows[0],
                innings1_total_wickets : innings1_total_wickets.rows[0],
                pieplot: pieplot.rows[0],
                pieplot2 : pieplot2.rows[0],
                battingOrder : battingOrder .rows[0],
                overs1: overs1.rows[0],
                overs2: overs2.rows[0],
                total_overs: total_overs.rows

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
            select T.tid, T.mid, ROUND((T.runsScored*1.0/T.oversPlayed) - (OP.opponentRunsScored*1.0/opponentOversPlayed),2)
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
        const q2 = db.query("select count(*) from match where match.venue_id = $1;", [req.params.id]);
        const q3 = db.query("With res as (select match.match_id, sum(runs_scored + extra_runs) as runs from ball_by_ball, match where ball_by_ball.match_id = match.match_id and match.venue_id = $1 group by match.match_id) select coalesce(max(runs),0) as highest, coalesce(min(runs),0) as lowest from res;", [req.params.id])
        const q4 = db.query("With res as (select match.match_id, sum(runs_scored + extra_runs) as runs1 from ball_by_ball, match where ball_by_ball.match_id = match.match_id and match.venue_id = $1 and innings_no = 1 group by match.match_id), res1 as (select match.match_id, sum(runs_scored + extra_runs) as runs2 from ball_by_ball, match where ball_by_ball.match_id = match.match_id and match.venue_id = $1 and innings_no = 2 group by match.match_id) select coalesce(max(runs1),0) as highest from res, res1, match where res.match_id = res1.match_id and res.match_id = match.match_id and ((toss_name = 'bat' and match_winner <>toss_winner) or (toss_name = 'field' and match_winner = toss_winner));", [req.params.id])
        const q5 = db.query("select count(*) from match where ((toss_name = 'bat' and match_winner = toss_winner) or (toss_name = 'field' and match_winner <> toss_winner)) and venue_id = $1;", [req.params.id]);
        const q6 = db.query("select count(*) from match where ((toss_name = 'bat' and match_winner <>toss_winner) or (toss_name = 'field' and match_winner = toss_winner)) and venue_id = $1;", [req.params.id]);
        const q7 = db.query("select count(*) from match where match_winner = -1 and venue_id = $1;", [req.params.id]);
        const q8 = db.query("with res as (select match.match_id, season_year, sum(runs_scored) from ball_by_ball, match where ball_by_ball.match_id = match.match_id and innings_no = 1 and venue_id = $1 group by match.match_id, season_year) select coalesce(avg(sum),0) as avg, season_year from res group by season_year ;", [req.params.id]);
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
        const results = await db.query("INSERT INTO venue (venue_id, venue_name, city_name, country_name, capacity) values (nextval('auto_increment_id_seq'), $1, $2, $3, $4) returning *;",[req.body.name, req.body.city, req.body.location , req.body.capacity]);
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
        const q3 = db.query("select coalesce(sum(runs_scored),0) as runs, 4*count(case when runs_scored = 4 then 1 end) as fours, 6*count(case when runs_scored = 6 then 1 end) as sixes from ball_by_ball where striker = $1", [req.params.id])
        const q4 = db.query("With res as (select match_id, coalesce(sum(runs_scored),0) as sum, count(*) as balls , count(out_type) as outs from ball_by_ball where striker = $1 group by match_id) select coalesce(max(sum),0) as max, count(case when (sum >= 50 and sum <100) then 1 end), ROUND(100.0 * coalesce(sum(sum),0) / (case when coalesce(sum(balls),0) > 0 then sum(balls) else 1 end) * 1.0, 2) as strike_rate, ROUND(1.0 * coalesce(sum(sum),0) / (case when coalesce(sum(outs),0) > 0 then sum(outs) else 1 end) * 1.0, 2) as average from res;", [req.params.id])
        const q5 = db.query("with res as (select count(distinct match_id), count(out_type) as outs, count(*) as balls, coalesce(sum(runs_scored + extra_runs),0) as sum, count(case when ball_id<=6 then 1 end)/6 + (case when count(case when ball_id<=6 then 1 end)%6 =0 then 0 else 1 end)  as overs  from ball_by_ball where ($1 = bowler)) select count, outs, balls, sum, overs, (case when overs = 0 then 0 else ROUND((1.0*sum)/overs,2) end) as avg from res;", [req.params.id]);
        const q6 = db.query("with res as (select count(out_type), match_id from ball_by_ball where ($1 = bowler) group by match_id) select count(*) from res where count>= 5;", [req.params.id]);
        const q7 = db.query("with res as (select coalesce(sum(runs_scored),0) as sum, match_id from ball_by_ball where striker = $1 group by match_id) select (case when sum <30 then sum else 0 end) as sum, match_id from res;", [req.params.id]);
        const q8 = db.query("select count(out_type), sum(runs_scored + extra_runs), match_id from ball_by_ball where bowler = $1 group by match_id;", [req.params.id]);
        const q9 = db.query("with res as (select coalesce(sum(runs_scored),0) as sum, match_id from ball_by_ball where striker = $1 group by match_id) select (case when sum >=30 and sum < 50 then sum else 0 end) as sum, match_id from res;", [req.params.id]);
        const q10 = db.query("with res as (select coalesce(sum(runs_scored),0) as sum, match_id from ball_by_ball where striker = $1 group by match_id) select (case when sum >=50 then sum else 0 end) as sum, match_id from res;", [req.params.id]);
        console.log(q1)
        res.status(200).json({
            status: "success",
            data: {
                r1: (await q1).rows[0], 
                r2: (await q2).rows[0],
                r3: (await q3).rows[0],
                r4: (await q4).rows[0],
                r5: (await q5).rows[0],
                r6: (await q6).rows[0],
                r7: (await q7).rows,
                r8: (await q8).rows,
                r9: (await q9).rows,
                r10: (await q10).rows,
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
