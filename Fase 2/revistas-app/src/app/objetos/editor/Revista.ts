import { Categoria } from "../base/Categoria";

export class Revista {
  private _id: number | null;
  private _nombre: string;
  private _descripcion: string;
  private _fechaPublicacion: Date;
  private _categoria: Categoria;
  private _estadoSuscripciones: string | null;

  constructor(id: number | null, nombre: string, descripcion: string, fechaPublicacion: Date, categoria: Categoria, estadoSuscripciones: string|null) {
    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._fechaPublicacion = fechaPublicacion;
    this._categoria = categoria;
    this._estadoSuscripciones = estadoSuscripciones;
  }

  public get id(): number | null{
    return this._id;
  }

  public get nombre(): string{
    return this._nombre;
  }

  public get descripcion(): string{
    return this._descripcion;
  }


  public get fechaPublicacion(): Date{
    return this._fechaPublicacion;
  }

  public get categoria(): Categoria{
    return this._categoria;
  }

  public get estadoSuscripciones(): string|null {
    return this._estadoSuscripciones;
  }
}
