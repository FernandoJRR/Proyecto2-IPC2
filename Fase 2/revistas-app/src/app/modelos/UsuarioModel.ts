import { Etiqueta } from "../objetos/base/Etiqueta";
import { GeneroEnum } from "../objetos/base/GeneroEnum";
import { Usuario } from "../objetos/base/Usuario";
import { EtiquetaModel } from "./EtiquetaModel";

export class UsuarioModel {
    private username: string;
    private password: string;
    private descripcion: string | null;
    private hobbies: string | null;
    private genero: GeneroEnum | null;
    private etiquetas: Array<EtiquetaModel>;
    
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