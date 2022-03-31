from nba_api.stats.static import players
from nba_api.stats.endpoints import commonplayerinfo
from flask import jsonify

class Players():
          def __init__(self, player=None):
                    self.player = player
          
          '''static method to get every player'''
          @staticmethod
          def all_players():
                    player_list = players.get_players()
                    return jsonify(player_list)

          '''static method to get active players'''
          @staticmethod
          def active_players():
                    player_list = players.get_active_players()
                    return jsonify(player_list)

          '''static method to get inactive players'''
          @staticmethod
          def inactive_players():
                    player_list = players.get_inactive_players()
                    return jsonify(player_list)
                    
          """static method to return a list of all players and player ids"""
          @staticmethod
          def player_names():
                    player_list = players.get_players()
                    return jsonify(player_list)
          
          """static method to return players bio"""
          @staticmethod
          def player_bio(player):
                    players_bio = commonplayerinfo.CommonPlayerInfo(player_id=player).get_normalized_dict()
                    players_bio = players_bio['CommonPlayerInfo']
                    return players_bio




                 