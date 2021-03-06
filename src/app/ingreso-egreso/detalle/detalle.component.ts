import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit,OnDestroy {

  items:IngresoEgreso[];
  subscription:Subscription = new Subscription()

  constructor(
    private store:Store<fromIngresoEgreso.IngresoEgresoAppState>,
    private ingresoEgresoService:IngresoEgresoService,
    private afs:AngularFirestore
  ){}

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(data => {
        this.items = data.items
      })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }

  borrarItem(item:IngresoEgreso){
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
      .then(()=>{
        Swal.fire('Eliminado', item.description, 'success')
      })
  }

}
