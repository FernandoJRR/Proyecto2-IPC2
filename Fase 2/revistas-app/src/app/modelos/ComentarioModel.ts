import { Comentario } from "../objetos/revista/Comentario";

export class ComentarioModel {
    public id: number;
    public usuario: string;
    public revista: number;
    public numeroRevista: number;
    public comentario: string;
    public fechaPublicacion: Date;
    
    constructor(comentario: Comentario) {
        this.id = comentario.id;
        this.usuario = comentario.usuario;
        this.revista = comentario.revista;
        this.numeroRevista = comentario.numeroRevista;
        this.comentario = comentario.comentario;
        this.fechaPublicacion = comentario.fechaPublicacion;
    }
}