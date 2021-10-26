export class Suscripcion {
    private _id: number;
    private _usuario: string;
    private _revista: number;
    private _fechaSuscripcion: Date;
    private _fechaCancelacion: Date|null;
    
    constructor(id: number, usuario: string, revista: number, fechaSuscripcion: Date, fechaCancelacion: Date|null) {
        this._id = id;
        this._usuario = usuario;
        this._revista = revista;
        this._fechaSuscripcion = fechaSuscripcion;
        this._fechaCancelacion = fechaCancelacion;
    }
    
    public get id(): number {
        return this._id;
    }
    public get usuario(): string {
        return this._usuario;
    }
    public get revista(): number {
        return this._revista;
    }
    public get fechaSuscripcion(): Date {
        return this._fechaSuscripcion;
    }
    public get fechaCancelacion(): Date|null {
        return this._fechaCancelacion;
    }
}