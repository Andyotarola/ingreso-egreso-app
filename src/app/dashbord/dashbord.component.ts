import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styles: [
  ]
})
export class DashbordComponent implements OnInit {

  constructor(
    private ingresoEgreso:IngresoEgresoService
  ){}

  ngOnInit(): void {

    this.ingresoEgreso.initIngresoEgresoListener()

  }

}
