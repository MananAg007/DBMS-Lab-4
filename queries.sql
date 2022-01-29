with
M(mid) as (select match_id  from match where season_year =  2013),
A as (select * from ball_by_ball natural join player_match where ball_by_ball.match_id in (select * from M) and ball_by_ball.match_id = player_match.match_id and player_id = striker) ,
 T(tid, runsScored) as (
    select team_id, sum(runs_scored) from A group by team_id
)

select * from T;
select T (tid, runsScored, oversPlayed, antiRunsScored, antiOversPlayed) as (select 
)count(distinct match_id, over_id, innings_no)

select team_name, 
(select count(*) from match where match_winner = team_id) as won,
 (select count(*) from match where team_id in (team1, team2)) as mat 
 from team
;