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

   