export class Comentario {
    private _id: number;
    private _usuario: string;
    private _revista: number;
    private _numeroRevista: number;
    private _comentario: string;
    private _fechaPublicacion: Date;
    
    constructor(id: number, usuario: string, revista: number, numeroRevista: number, comentario: string, fechaPublicacion: Date) {
        this._id = id;
        this._usuario = usuario;
        this._revista = revista;
        this._numeroRevista = numeroRevista;
        this._comentario = comentario;
        this._fechaPublicacion = fechaPublicacion;
    }
    
    public get id(): number{
        return this._id
    }
    public get usuario(): string{
        return this._usuario
    }
    public get revista(): number{
        return this._revista
    }
    public get numeroRevista(): number{
        return this._numeroRevista
    }
    public get comentario(): string{
        return this._comentario
    }
    public get fechaPublicacion(): Date {
        return this._fechaPublicacion
    }
    
}