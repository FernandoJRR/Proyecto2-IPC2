import { Etiqueta } from "./Etiqueta";
import { GeneroEnum } from "./GeneroEnum";

export class Usuario {
    private _username: string;
    private _password: string;
    private _descripcion: string | null;
    private _hobbies: string | null;
    private _genero: GeneroEnum | null;
    private _etiquetas: Array<Etiqueta>;
    
    constructor(username: string, password: string, descripcion: string, hobbies: string, genero: GeneroEnum, etiquetas: Array<Etiqueta>){
        this._username = username;
        this._password = password;
        this._descripcion = descripcion;
        this._hobbies = hobbies;
        this._genero = genero;
        this._etiquetas = etiquetas;
    }
    
    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get descripcion(): string|null {
        return this._descripcion;
    }
    public set descripcion(value: string|null) {
        this._descripcion = value;
    }

    public get hobbies(): string|null {
        return this._hobbies;
    }
    public set hobbies(value: string|null) {
        this._hobbies = value;
    }

    public get genero(): GeneroEnum|null {
        return this._genero;
    }
    public set genero(value: GeneroEnum|null) {
        this._genero = value;
    }

    public get etiquetas(): Array<Etiqueta> {
        return this._etiquetas;
    }
    public set etiquetas(value: Array<Etiqueta>) {
        this._etiquetas = value;
    }
}