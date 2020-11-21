import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from '../dashbord/dashbord.component'
import { IngresoEgresoComponent } from './ingreso-egreso.component'
import { EstadisticaComponent } from './estadistica/estadistica.component'
import { DetalleComponent } from './detalle/detalle.component'
import { OrdenIngreseEgresoPipe } from './orden-ingrese-egreso.pipe'
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashbordRoutingModule } from '../dashbord/dashbord-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer'

@NgModule({
  declarations: [
    DashbordComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,  
    OrdenIngreseEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer),
    SharedModule,
    DashbordRoutingModule
  ],
})
export class IngresoEgresoModule { }
