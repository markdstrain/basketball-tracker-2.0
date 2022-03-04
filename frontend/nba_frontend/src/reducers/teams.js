import { SET_TEAMS
                
              } from "../actions/types";

export default function playerReducer(state = {}, action) {
          switch(action.type) {
                    case SET_TEAMS:
                              return {
                                        ...state,
                                        teams: action.teams
                              };
                    default: 
                              return state;
          }
}