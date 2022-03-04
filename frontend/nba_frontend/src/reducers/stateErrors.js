import { SET_STATE_ERRORS } from "../actions/types";



export default function errorReducer(state = {}, action) {
    switch(action.type) {
        case SET_STATE_ERRORS:
            return {
                ...state, errors: action.payload};
        default: 
            return state;
    }
}