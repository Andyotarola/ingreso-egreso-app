import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from '../auth/auth.service'
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map, switchMap } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  initIngresoEgresoListenerSubs:Subscription = new Subscription();

  constructor(
    private afs:AngularFirestore,
    private authService:AuthService,
    private store:Store<AppState>
  ){}

  crearIngresoEgreso(ingresoEgreso:IngresoEgreso){
    const user:User = this.authService.getUser();

    return this.afs.doc(`users/${user.uid}`).collection('ingresos-egresos').add({...ingresoEgreso})

  }

  borrarIngresoEgreso(uid:string){
    const user:User = this.authService.getUser();
    return this.afs.doc(`users/${user.uid}/ingresos-egresos/${uid}`)
            .delete();
  }

  cancelarSubs(): void{
    this.initIngresoEgresoListenerSubs.unsubscribe();
    this.store.dispatch(new UnsetItemsAction())
  }

  initIngresoEgresoListener(){

    this.initIngresoEgresoListenerSubs = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null ),
        switchMap((auth) => {
          return this.afs.collection(`users/${auth.user.uid}/ingresos-egresos`)
            .valueChanges({idField:'uid'})
        })
      )
      .subscribe(items => {
        this.store.dispatch(new SetItemsAction(items as IngresoEgreso[]))
      })

  }
 
}
