from flask import json, jsonify
import requests

class Schedule():
          def __init__(self, team=None):
                    self.team = team

          @staticmethod
          def regular_season():
                    r = requests.get('https://cdn.nba.com/static/json/staticData/scheduleLeagueV2.json')
                    r = json.loads(r.text)
                    league=r["leagueSchedule"]
                    reg_season=league["gameDates"]
                    keys_to_retain = ["gameDate", "games"]
                    reg_season_schedule = [{key: d[key] for key in keys_to_retain} for d in reg_season]
                    return reg_season_schedule
          
          @classmethod
          def team_schedule(self, team):
                    schedule = self.regular_season()
                    teamSched = [d for d in schedule if d['games']['homeTeam']['teamId']== team or d['games']['awayTeam']['teamId']==team]
                    return teamSched