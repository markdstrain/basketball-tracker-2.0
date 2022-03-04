import { SET_STATE_ERRORS } from "./types"


export const createErrors = (errors) => ({
          type: SET_STATE_ERRORS,
          payload: errors,
})