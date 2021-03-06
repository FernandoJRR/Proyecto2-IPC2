import { GeneroEnum } from "../objetos/base/GeneroEnum";
import { Usuario } from "../objetos/base/Usuario";
import { EtiquetaModel } from "./EtiquetaModel";

export class UsuarioModel {
    public username: string;
    public password: string;
    public descripcion: string | null;
    public hobbies: string | null;
    public genero: GeneroEnum | null;
    public etiquetas: Array<EtiquetaModel>;
    
    constructor(usuario: Usuario){
        this.username = usuario.username;
        this.password = usuario.password;
        this.descripcion = usuario.descripcion;
        this.hobbies = usuario.hobbies;
        this.genero = usuario.genero;
        this.etiquetas = [];
        usuario.etiquetas.forEach(etiqueta => {
            this.etiquetas.push(new EtiquetaModel(etiqueta))
        })
    }
}
