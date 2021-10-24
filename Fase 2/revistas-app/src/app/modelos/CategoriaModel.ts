import { Categoria } from "../objetos/base/Categoria";

export class CategoriaModel {
    public nombre: string;

    constructor(categoria: Categoria) {
        this.nombre = categoria.nombre;
    }
}
