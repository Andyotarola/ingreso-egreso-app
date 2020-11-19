import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { DashbordComponent }  from './dashbord/dashbord.component'
import { dashbordRoutes  } from './dashbord/dashbord.routes'
import { AuthGuard } from './auth/auth.guard'

const routes:Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: DashbordComponent,
        children: dashbordRoutes,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: '**',
        redirectTo:'',
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}