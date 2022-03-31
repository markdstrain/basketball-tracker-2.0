from flask import Flask, jsonify, abort
from schedule import Schedule
from league_leaders import Leaders
from standings import Standings
from teams import Teams
from players import Players
from news import News

app = Flask(__name__)

@app.route('/teams', methods=['GET'])
def get_teams():
          return Teams.get_teams()

@app.route('/players/<status>', methods=['GET'])
def get_players(status):
          if status == "all":
                    return Players.all_players()
          elif status == "active":
                    return Players.active_players()
          elif status == "inactive":
                    return Players.inactive_players()
          elif status == "names":
                    return Players.player_names()
          else:
                    abort(404)





@app.route('/players/bio/<player>', methods=['GET'])
def get_players_bio(player):
          return  jsonify(Players.player_bio(player))
          
@app.route('/standings/<conference>', methods=['GET'])
def get_standings(conference="both"):
          if conference == "eastern":
                    return jsonify(Standings.eastern_conference())
          elif conference == "western":
                    return jsonify(Standings.western_conference())
          else:
                    return Standings.both()


@app.route('/schedule', methods=['GET'])
def get_schedule():
                    return jsonify(Schedule.regular_season())

@app.route('/playerleaders/<season>/<per>/<teamId>', methods= ['GET'])
def get_articles(season, per,teamId):
          if teamId=='all':
                    teamId=""
          return Leaders.leaders(season, per,teamId)
          
@app.route('/teamleaders/<season>/<per>', methods=['GET'])
def get_team_stats(season, per):

          return Leaders.team_leaders(season, per)

@app.route('/roster/<teamId>', methods = ['GET'])
def get_team_roster(teamId):
          
          return jsonify(Teams.roster(teamId))

@app.route('/news/<query>', methods = ['GET'] )
def get_news(query):
         
         return jsonify(News.get_query(query))

if __name__=="__main__":
          app.run(debug=True)