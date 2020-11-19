import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import  'firebase/auth'
import Swal from 'sweetalert2'
import { map } from 'rxjs/operators'
import { User } from 'src/app/models/user'
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store'
import { ActiveLoadingAction, DesactiveLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private router:Router,
    private store:Store<AppState>
  ){}

  createUser(name:string, email:string, password:string): void{

    this.store.dispatch(new ActiveLoadingAction())

    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(data => {

        const user:User = {
          email: data.user.email,
          uid: data.user.uid,
          name
        }

        this.afs.collection('users').doc(user.uid)
          .set(user)
          .then(()=>{
            this.router.navigate(['/'])
            this.store.dispatch(new DesactiveLoadingAction())

          })
        
      })
      .catch(err => {
        console.log(err);
        this.store.dispatch(new DesactiveLoadingAction())
        Swal.fire('Error al registrar', err.message, 'error')
      })
  }

  login(email:string, password:string){
    this.store.dispatch(new ActiveLoadingAction())

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(data => {
        this.router.navigate(['/'])
        this.store.dispatch(new DesactiveLoadingAction())
      })
      .catch(err => {
        console.log(err);
        this.store.dispatch(new DesactiveLoadingAction())
        Swal.fire('Error en el login', err.message, 'error')
      })
  }


  logout(){
    this.afAuth.signOut()
    location.href = '/login'
  }

  isAuth(){
    return this.afAuth.authState
      .pipe(
        map(user => {
          if(user == null){
            this.router.navigate(['/login'])
          }else{
            this.afs.doc<User>(`users/${user.uid}`)
            .valueChanges()
            .subscribe( userData => {
                console.log(userData);  
                this.store.dispatch(new SetUserAction(userData))
              })
          }

          return user != null

        })
      )
  }

}
