import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit,OnDestroy {

  cargando:boolean;
  subscription: Subscription;

  constructor(
    private authService:AuthService,
    private store:Store<AppState>
  ){}

  ngOnInit(): void {
    this.subscription = this.store.select('ui')
      .subscribe( ui => {
        this.cargando = ui.isLoading
      })
  }

  onSubmit(data): void{
    this.authService.createUser(data.name, data.email, data.password)
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }

}
