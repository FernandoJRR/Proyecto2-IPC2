import { Pago } from "../objetos/base/Pago";

export class PagoModel {
    public usuario: string;
    public suscripcion: number;
    public fechaPago: Date;
    public periodo: string;
    public tiempoPagado: number;
    
    constructor(pago: Pago) {
        this.usuario = pago.usuario;
        this.suscripcion = pago.suscripcion;
        this.fechaPago = pago.fechaPago;
        this.periodo = pago.periodo;
        this.tiempoPagado = pago.tiempoPagado;
    }
}