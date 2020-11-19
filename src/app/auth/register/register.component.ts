import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService:AuthService
  ){}

  ngOnInit(): void {
  }

  onSubmit(data): void{
    this.authService.createUser(data.name, data.email, data.password)
  }

}
