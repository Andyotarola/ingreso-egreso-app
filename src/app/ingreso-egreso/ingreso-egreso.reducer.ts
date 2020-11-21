import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso';
import * as fromIngresoEgreso from './ingreso-egreso.actions';

export interface IngresoEgresoState{
    items: IngresoEgreso[];
}

export interface IngresoEgresoAppState extends AppState{
    ingresoEgreso:IngresoEgresoState;
}

const initState:IngresoEgresoState = {
    items: []
}

export const ingresoEgresoReducer = (state=initState, action:fromIngresoEgreso.actions):IngresoEgresoState =>{

    switch(action.type){

        case fromIngresoEgreso.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item =>{
                        return {
                            ...item
                        }
                    })
                ]
            }

        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            }

        default:
            return state;

    }

}