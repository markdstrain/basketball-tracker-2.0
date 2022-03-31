from numpy import take
from pygooglenews import GoogleNews;
from flask import jsonify;

gn = GoogleNews()

class News():
          def __init__(self, query = 'nba'):
                    self. query = query

          '''static method to get every player'''
          @staticmethod
          def get_query(query):
                    search = gn.search(f'{query}')
                    search = search['entries']
                    search = list(search)[:6]
                    return search