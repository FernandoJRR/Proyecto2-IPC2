import { Etiqueta } from "../objetos/base/Etiqueta";

export class EtiquetaModel {
    public nombre: string;

    constructor(etiqueta: Etiqueta) {
        this.nombre = etiqueta.nombre;
    }
}
