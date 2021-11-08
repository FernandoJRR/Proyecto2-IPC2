export class CostoHosting {
    private _fechaInicio: Date;
    private _porcentaje: number;
    
    constructor(fechaInicio: Date, porcentaje: number) {
        this._fechaInicio = fechaInicio;
        this._porcentaje = porcentaje;
    }
    
    public get fechaInicio() : Date {
        return this._fechaInicio;
    }
    public get porcentaje() : number {
        return this._porcentaje;
    }
}