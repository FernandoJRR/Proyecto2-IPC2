export class PrecioSuscripcion {
  private _idRevista: number;
  private _fechaInicio: Date;
  private _precio: number;

  constructor(idRevista: number, fechaInicio: Date, precio: number) {
    this._idRevista = idRevista;
    this._fechaInicio = fechaInicio;
    this._precio = precio;
  }

  public get idRevista() {
    return this._idRevista;
  }

  public get fechaInicio() {
    return this._fechaInicio;
  }

  public get precio() {
    return this._precio;
  }
}
