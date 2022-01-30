with M(mid) as (select match_id  from match where season_year =  2011),
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
select *, (mat - won- tied)  as lost from team, AllVals where team.team_id = tid;

   


B2
BAtter:

with T1 as
(select striker, coalesce(sum(runs_scored),0)  as runs from ball_by_ball where match_id =  598008 and innings_no =1 group by striker),
T2 as 
(select striker, count(*) as fours from ball_by_ball where match_id =  598008 and innings_no =1 and runs_scored = 4 group by striker),
T3 as 
(select striker, count(*) as sixes from ball_by_ball where match_id =  598008 and innings_no =1 and runs_scored = 6 group by striker),
T4 as 
(select striker, count(*) as balls_faced from ball_by_ball where match_id =  598008 and innings_no =1  group by striker )
select T1.striker, runs,coalesce( fours,0), coalesce( sixes,0), balls_faced from T1 full outer join  T2 on T1.striker = T2.striker full outer join  T3 on Coalesce(T1.striker, T2.striker) = T3.striker full outer join  T4 on Coalesce(T1.striker, T2.striker, T3.striker) = T4.striker;

extra_runs:
select coalesce(sum(extra_runs),0) as extra_runs from ball_by_ball where match_id =  598008 and innings_no =1;
total_runs:
select coalesce(sum(runs_scored),0)  as total_runs from ball_by_ball where match_id =  598008 and innings_no =1;


Bowler:
with T1 as
(select bowler, coalesce(sum(runs_scored),0)  as runs_given from ball_by_ball where match_id =  598008 and innings_no =1 group by bowler),
with T2 as 
(select bowler, count(*)  as wickets from ball_by_ball where match_id =  598008 and innings_no =1 and out_type is in ?? group by bowler)


with  B as (select * from ball_by_ball where match_id = 829720)
, F as (select count (*)*4 as fours from B where runs_scored = 4),
 S as (select count (*)*6 as sixes from B where runs_scored = 6),
E as (select coalesce(sum(extra_runs),0)  from B ),
O as (select count (*) as ones from B where runs_scored = 1),
T as (select count (*) as twos from B where runs_scored = 2)
select * from F,S,E,O,T;