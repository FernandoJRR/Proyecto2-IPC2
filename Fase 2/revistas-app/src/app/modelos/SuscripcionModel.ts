import { Suscripcion } from "../objetos/base/Suscripcion";

export class SuscripcionModel {
    public id: number;
    public usuario: string;
    public revista: number;
    public fechaSuscripcion: Date;
    public fechaCancelacion: Date|null;
    
    constructor(suscripcion: Suscripcion) {
        this.id = suscripcion.id;
        this.usuario = suscripcion.usuario;
        this.revista = suscripcion.revista;
        this.fechaSuscripcion = suscripcion.fechaSuscripcion;
        this.fechaCancelacion = suscripcion.fechaCancelacion;
    }
}