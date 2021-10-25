import { NumeroRevista } from "../objetos/editor/NumeroRevista";

export class NumeroRevistaModel {
    public numero: number|null;
    public idRevista: number;
    public nombre: string;
    public descripcion: string|null;
    public fechaPublicacion: Date;
    public PDF: string;
    public costoHosting: number;
    public restriccionMeGusta: string|null;
    public restriccionComentarios: string|null;
    
    constructor(numeroRevista: NumeroRevista) {
        this.numero = numeroRevista.numero;
        this.idRevista = numeroRevista.idRevista;
        this.nombre = numeroRevista.nombre;
        this.descripcion = numeroRevista.descripcion;
        this.fechaPublicacion = numeroRevista.fechaPublicacion;
        this.PDF = numeroRevista.PDF;
        this.costoHosting = numeroRevista.costoHosting;
        this.restriccionMeGusta = numeroRevista.restriccionMeGusta;
        this.restriccionComentarios = numeroRevista.restriccionComentarios;
    }
}