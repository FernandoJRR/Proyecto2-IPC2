import { Editor } from "../objetos/base/Editor";
import { GeneroEnum } from "../objetos/base/GeneroEnum";
import { Usuario } from "../objetos/base/Usuario";
import { EtiquetaModel } from "./EtiquetaModel";

export class EditorModel {
    private username: string;
    private password: string;
    private descripcion: string | null;
    private hobbies: string | null;
    private genero: GeneroEnum | null;
    
    constructor(editor: Editor){
        this.username = editor.username;
        this.password = editor.password;
        this.descripcion = editor.descripcion;
        this.hobbies = editor.hobbies;
        this.genero = editor.genero;
    }
}
    