import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Etiqueta } from "src/app/objetos/base/Etiqueta";
import { Usuario } from "src/app/objetos/base/Usuario";
import { UsuarioModel } from "src/app/modelos/UsuarioModel";

@Injectable({
    providedIn: 'root'
})
export class RegistroUsuariosServicio {
    readonly API_URL = "http://localhost:8080/servidor-revistas/";
        
    constructor(private httpClient: HttpClient) { }
    
    public obtenerEtiquetas(): Observable<Etiqueta[]> {
        return this.httpClient.get<Etiqueta[]>(this.API_URL + "obtener-etiquetas");
    }
    
    public checkDisponibilidadUsuario(username: string): Observable<string> {
        return this.httpClient.get<string>(this.API_URL + "obtener-disponibilidad-username?username="+username);
    }
    
    public registrarUsuario(usuario: Usuario): Observable<boolean> {
        let modelo = new UsuarioModel(usuario);
        return this.httpClient.post<boolean>(this.API_URL + "registrar-usuario", modelo);
    }
}