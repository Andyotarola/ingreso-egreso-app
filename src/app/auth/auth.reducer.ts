import { User } from '../models/user';
import * as fromAuthActions from './auth.actions';

export interface AuthState {
    user:User
}

const initState:AuthState = {
    user: null
}

export const authReducer = (state=initState,action:fromAuthActions.actions):AuthState =>{

    switch(action.type){
        
        case fromAuthActions.SET_USER:
            return {
                user: { ...action.user }
            };

        case fromAuthActions.UNSET_USER:
            return {user: null}

        default:
            return state;
    }
}