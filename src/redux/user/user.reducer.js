import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state, // con esto solo cambiamos el currentUser y todo el estado anterior sigue igual
                currentUser: action.payload
            }
        default:
            return state;

    }
}

export default userReducer;