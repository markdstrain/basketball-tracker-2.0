from re import X
from turtle import st
from nba_api.stats.endpoints import leaguestandings
from flask import jsonify

class Standings:
          def __init__(self) -> None:
              pass
          """Static method to make the call to Swar Patel's nba_api gives back a list of dictionaries of all teams"""
          @staticmethod
          def teams():
                    standings = leaguestandings.LeagueStandings().get_normalized_dict()
                    return standings
          
          """Class Method That calls on the Static Method teams and then returns all Eastern Conference Teams"""
          @classmethod
          def eastern_conference(self):
                    standings =self.teams()
                    standings = standings["Standings"]
                    eastern_standings = [d for d in standings if d['Conference'] == 'East']
                    return eastern_standings

          """Class Method that calls on the Static Method teams and then returns all Western Conference Teams"""
          @classmethod
          def western_conference(self):
                    standings = self.teams()
                    standings = standings["Standings"]
                    western_standings = [d for d in standings if d['Conference'] == 'West']
                    return western_standings

          """Both will make a list of  two list containing eastern and western conferences"""
          @classmethod
          def both(self):
                    keys = ["Eastern", "Western"]
                    values = [self.eastern_conference(), self.western_conference()]
                    standings = zip(keys, values)
                    standings = dict(standings)
                    return jsonify(standings)