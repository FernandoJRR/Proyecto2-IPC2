export class NumeroRevista {
    private _numero: number|null;
    private _idRevista: number;
    private _nombre: string;
    private _descripcion: string|null;
    private _fechaPublicacion: Date;
    private _PDF: string;
    private _costoHosting: number;
    private _restriccionMeGusta: string|null;
    private _restriccionComentarios: string|null;
    
    constructor(numero: number|null, idRevista: number, nombre: string, 
                descripcion: string|null, fechaPublicacion: Date, PDF: string, 
                costoHosting: number, restriccionMeGusta: string|null, restriccionComentarios: string|null) {

        this._numero = numero;
        this._idRevista = idRevista;
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._fechaPublicacion = fechaPublicacion;
        this._PDF = PDF;
        this._costoHosting = costoHosting;
        this._restriccionMeGusta = restriccionMeGusta;
        this._restriccionComentarios = restriccionComentarios;
    }
    
    public get numero(): number|null {
        return this._numero;
    }
    public get idRevista(): number {
        return this._idRevista;
    }
    public get nombre(): string {
        return this._nombre;
    }
    public get descripcion(): string|null {
        return this._descripcion;
    }
    public get fechaPublicacion(): Date {
        return this._fechaPublicacion;
    }
    public get PDF(): string {
        return this._PDF;
    }
    public get costoHosting(): number {
        return this._costoHosting;
    }
    public get restriccionMeGusta(): string | null {
        return this._restriccionMeGusta;
    }
    public set restriccionMeGusta(value: string|null) {
        this._restriccionMeGusta = value;
    }
    public get restriccionComentarios(): string | null {
        return this._restriccionComentarios;
    }
    public set restriccionComentarios(value: string|null) {
        this._restriccionComentarios = value;
    }
}