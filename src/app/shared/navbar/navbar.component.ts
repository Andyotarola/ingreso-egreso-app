import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit,OnDestroy {

  name:string;
  subscription:Subscription =  new Subscription()

  constructor(
    private store:Store<AppState>
  ){}

  ngOnInit(): void {
    
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => {
        this.name = auth.user.name
      })

  }

  ngOnDestroy(): void{

    this.subscription.unsubscribe()

  }

}
