export interface IngresoEgreso{

    description: string;
    amount: number;
    type: 'egreso' | 'ingreso';
    uid?:string;
}