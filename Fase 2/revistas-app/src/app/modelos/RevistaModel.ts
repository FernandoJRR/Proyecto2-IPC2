import { Categoria } from "../objetos/base/Categoria";
import { Revista } from "../objetos/editor/Revista";
import { EtiquetaModel } from "./EtiquetaModel";

export class RevistaModel {
  public id: number | null;
  public nombre: string;
  public descripcion: string;
  public fechaPublicacion: Date;
  public categoria: Categoria;
  public etiquetas: Array<EtiquetaModel>;

  constructor(revista: Revista) {
    this.id = revista.id;
    this.nombre = revista.nombre;
    this.descripcion = revista.descripcion;
    this.fechaPublicacion = revista.fechaPublicacion;
    this.categoria = revista.categoria;
    this.etiquetas = [];
    revista.etiquetas.forEach(etiqueta => {
        this.etiquetas.push(new EtiquetaModel(etiqueta))
    })
  }
}
