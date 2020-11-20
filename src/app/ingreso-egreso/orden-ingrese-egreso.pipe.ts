import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso';

@Pipe({
  name: 'ordenIngreseEgreso'
})
export class OrdenIngreseEgresoPipe implements PipeTransform {

  transform(items:IngresoEgreso[]): IngresoEgreso[] {
    return [...items].sort((a) => {      
      if(a.type === 'ingreso'){
        return -1
      }else{
        return 1;
      }
    });
  }

}
