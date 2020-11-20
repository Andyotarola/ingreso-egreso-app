import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso';
import { IngresoEgresoService } from './ingreso-egreso.service'
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActiveLoadingAction, DesactiveLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {

  tipo:string = 'ingreso';
  loadingSubs:Subscription = new Subscription();
  cargando: boolean;

  form = new FormGroup({
    description: new FormControl('', [
      Validators.required
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
  })

  constructor(
    private ingresoEgresoService:IngresoEgresoService,
    private store:Store<AppState>
  ){}

  ngOnInit(): void {
    
    this.loadingSubs = this.store.select('ui')
                          .subscribe(ui => this.cargando = ui.isLoading)

  }

  onCrearIngresoEgreso(): void{

    this.store.dispatch(new ActiveLoadingAction())
    
    const ingresoEgreso:IngresoEgreso = {
      ...this.form.value,
      type: this.tipo
    }
    
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(()=>{
        this.store.dispatch(new DesactiveLoadingAction())
        Swal.fire('Creado', ingresoEgreso.description, 'success')
        // this.form.reset({
        //   amount: 0
        // })

      })
      .catch(err => console.log(err))

  }

  ngOnDestroy(): void{
    this.loadingSubs.unsubscribe()
  }

}
