from re import T
from nba_api.stats.static import teams
from nba_api.stats.endpoints import commonteamroster
from flask import jsonify

class Teams():
          def __init__(self, team=None):
                    self.team = team

          '''static method to get every team'''
          @staticmethod
          def get_teams():
                    teams_list = teams.get_teams()
                    return jsonify(teams_list)

          @staticmethod
          def roster(team):
                    roster = commonteamroster.CommonTeamRoster(team_id=team).get_normalized_dict()
                    return roster