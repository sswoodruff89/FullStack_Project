import {RECEIVE_CURRENT_USER, RECEIVE_SESSION_ERRORS, REMOVE_SESSION_ERRORS} from "../actions/session_actions";


export default (state = [], action) => {
    Object.freeze(state);
    
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
        case REMOVE_SESSION_ERRORS:
            return [];
        default:
            return state;
    }
};