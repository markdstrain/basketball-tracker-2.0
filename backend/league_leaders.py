from decouple import config
from nba_api.stats.endpoints import leaguedashplayerstats
from nba_api.stats.endpoints import leaguedashteamstats
from flask import jsonify

Current_Season = config('CURRENT_SEASON')

class Leaders():
          def __init__(self, season=Current_Season, per='Per48', team = '') :
                    self.season = season
                    self.per = per
                    self.team = team

          @staticmethod
          def leaders(season, per,team):
                    players = leaguedashplayerstats.LeagueDashPlayerStats(season=f'{season}',
                              team_id_nullable=f'{team}',
                              per_mode_detailed=f'{per}'
                              ).get_normalized_dict()
                    return jsonify(players)

          @staticmethod
          def team_leaders(season,per):
                    teams = leaguedashteamstats.LeagueDashTeamStats(season = f'{season}',
                              per_mode_detailed=f'{per}'
                              ).get_normalized_dict()
                    return jsonify(teams)
                              