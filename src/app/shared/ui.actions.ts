import { Action } from '@ngrx/store'

export const ACTIVE_LOADING = '[UI Loading] Cargando...';
export const DESACTIVE_LOADING = '[UI Loading] Fin de carga';

export class ActiveLoadingAction implements  Action {
    readonly type = ACTIVE_LOADING
}

export class DesactiveLoadingAction implements  Action {
    readonly type = DESACTIVE_LOADING
}

export type actions = ActiveLoadingAction | DesactiveLoadingAction