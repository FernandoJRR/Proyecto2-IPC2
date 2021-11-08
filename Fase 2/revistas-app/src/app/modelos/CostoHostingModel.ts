import { CostoHosting } from "../objetos/base/CostoHosting";

export class CostoHostingModel {
    public fechaInicio: Date;
    public porcentaje: number;
    
    constructor(costoHosting: CostoHosting) {
        this.fechaInicio = costoHosting.fechaInicio;
        this.porcentaje = costoHosting.porcentaje;
    }
}