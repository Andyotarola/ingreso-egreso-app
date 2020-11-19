import { from } from 'rxjs';
import * as fromUIActions from './ui.actions';

export interface State{
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
}

export const uiReducer = (state = initState, action:fromUIActions.actions): State => {

    switch( action.type){

        case fromUIActions.ACTIVE_LOADING:
            return  {
                isLoading: true
            };

        case fromUIActions.DESACTIVE_LOADING:
            return  {
                isLoading: false
            };        

        default:
            return state;
    }

}