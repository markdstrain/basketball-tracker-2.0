import axios from 'axios';
import { SET_PLAYERS,
                SET_TEAMS,
} from './types';
import { createErrors } from './error';

/**Local Host URL */
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:5000';

/** set players up in the reducers */

          /**1.   setting Players in the redux state */
export function setPlayers(players){
          return {
                    type: SET_PLAYERS,
                    players: players
          };
}


/**set teams up in the reducers */
          /**1.   setting Teams in the redux state */
export function setTeams(teams){
          return{
                    type: SET_TEAMS,
                    teams: teams
          };
}
 


/**getting all the information from the server */

          /**1. getting all Players */
export function getPlayers(){
          return async function(dispatch){
                    try{
                              const res = await axios.get(`${BASE_URL}/players/names`)
                              const plyrs = res.data

                              return dispatch(setPlayers(plyrs))
                    }catch(error){
                              return dispatch(createErrors(error.response));
                    }
          };
}
      
          /**3. getting all Teams */
export function getTeams(){
          return async function(dispatch){
                    try{
                              const res = await axios.get(`${BASE_URL}/teams`)
                              const teams = res.data
                              
                              return dispatch(setTeams(teams))
                    }catch(error){
                              return dispatch(createErrors(error.response));
                    }
          };
}
     

                   