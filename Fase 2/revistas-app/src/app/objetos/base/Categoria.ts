export class Categoria {
    private _nombre: string;

    constructor(nombre: string) {
        this._nombre = nombre;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }
}
