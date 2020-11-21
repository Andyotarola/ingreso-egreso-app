import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord.component'
import { dashbordRoutes } from './dashbord.routes'
// import { AuthGuard } from '../auth/auth.guard'

const routes:Routes = [
  {
      path: '',
      component: DashbordComponent, 
      children: dashbordRoutes,
      // canActivate: [
      //     AuthGuard
      // ]
  }, 
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class DashbordRoutingModule { }
