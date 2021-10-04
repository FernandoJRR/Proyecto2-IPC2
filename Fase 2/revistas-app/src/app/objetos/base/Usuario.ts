import { Etiqueta } from "./Etiqueta";
import { GeneroEnum } from "./GeneroEnum";

export class Usuario {
    _username: string;
    _password: string;
    _descripcion: string;
    _fechaNacimiento: Date;
    _genero: GeneroEnum;
    _etiquetas: Etiqueta[];
    
    constructor(username: string, password: string, descripcion: string, fechaNacimiento: Date, genero: GeneroEnum, etiquetas: Etiqueta[]){
        this._username = username;
        this._password = password;
        this._descripcion = descripcion;
        this._fechaNacimiento = fechaNacimiento;
        this._genero = genero;
        this._etiquetas = etiquetas;
    }
    
    get username(){
        return this._username;
    }

    get password(){
        return this._password;
    }

    get descripcion(){
        return this._descripcion;
    }

    get fechaDeNacimiento(){
        return this._fechaNacimiento;
    }
    

    get genero(){
        return this._genero;
    }

    get etiquetas(){
        return this._etiquetas;
    }
}