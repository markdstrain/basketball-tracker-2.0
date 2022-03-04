import { SET_PLAYERS
               
           } from "../actions/types";




export default function playerReducer(state = {}, action) {
          switch(action.type) {
                    case SET_PLAYERS:
                              return {
                                        ...state,
                                        payload: action.players
                              };
          default: 
                    return state;
          }
      }