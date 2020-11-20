import { UserActionTypes } from './user.types' 
export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})

// esto es una funcion que recibe el user pero retorna un action object