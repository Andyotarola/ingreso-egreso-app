import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import  'firebase/auth'
import Swal from 'sweetalert2'
import { map } from 'rxjs/operators'
import { User } from 'src/app/models/user'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private router:Router
  ){}

  createUser(name:string, email:string, password:string): void{
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
          })
        
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Error al registrar', err.message, 'error')
      })
  }

  login(email:string, password:string){
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(data => {
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err);
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

          console.log(user);
          

          if(user == null) this.router.navigate(['/login'])

          return user !=null
        })
      )
  }

}
