export class Pago {
    private _usuario: string;
    private _suscripcion: number;
    private _fechaPago: Date;
    private _periodo: string;
    private _tiempoPagado: number;
    
    constructor(usuario: string, suscripcion: number, fechaPago: Date, periodo: string, tiempoPagado: number) {
        this._usuario = usuario;
        this._suscripcion = suscripcion;
        this._fechaPago = fechaPago;
        this._periodo = periodo;
        this._tiempoPagado = tiempoPagado;
    }
    
    public get usuario(): string {
        return this._usuario;
    }
    public get suscripcion(): number {
        return this._suscripcion;
    }
    public get fechaPago(): Date {
        return this._fechaPago;
    }
    public get periodo(): string {
        return this._periodo;
    }
    public get tiempoPagado(): number {
        return this._tiempoPagado;
    }
}