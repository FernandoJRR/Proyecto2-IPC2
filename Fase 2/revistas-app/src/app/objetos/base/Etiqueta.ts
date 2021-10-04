export class Etiqueta{
    _nombre: string;
    
    constructor(nombre: string) {
        this._nombre = nombre;
    }
    
    get nombre(){
        return this._nombre;
    }
    
    set nombre(nombre: string){
        this._nombre = nombre;
    }
}