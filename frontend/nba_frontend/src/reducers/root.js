import players from './players';
import errors from './stateErrors';
import teams from './teams';
import { combineReducers } from "redux";

export default combineReducers({
          players,
          teams,
          errors,
      });