export class Comentario {
    private _id: number;
    private _usuario: string;
    private _revista: number;
    private _numeroRevista: number;
    private _comentario: string;
    
    constructor(id: number, usuario: string, revista: number, numeroRevista: number, comentario: string) {
        this._id = id;
        this._usuario = usuario;
        this._revista = revista;
        this._numeroRevista = numeroRevista;
        this._comentario = comentario;
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
}