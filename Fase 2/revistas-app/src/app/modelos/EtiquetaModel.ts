import { Etiqueta } from "../objetos/base/Etiqueta";

export class EtiquetaModel {
    private nombre: string;

    constructor(etiqueta: Etiqueta) {
        this.nombre = etiqueta.nombre;
    }
}