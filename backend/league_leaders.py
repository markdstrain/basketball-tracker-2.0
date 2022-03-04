from nba_api.stats.endpoints import leaguedashplayerstats
from nba_api.stats.endpoints import leaguedashteamstats
from flask import jsonify

class Leaders():
          def __init__(self, season='2021-22', per='Per48') :
                    self.season = season
                    self.per = per

          @staticmethod
          def leaders(season, per):
                    players = leaguedashplayerstats.LeagueDashPlayerStats(season=f'{season}',
                              per_mode_detailed=f'{per}'
                              ).get_normalized_dict()
                    return jsonify(players)

          @staticmethod
          def team_leaders(season,per):
                    teams = leaguedashteamstats.LeagueDashTeamStats(season = f'{season}',
                              per_mode_detailed=f'{per}'
                              ).get_normalized_dict()
                    return jsonify(teams)
                              