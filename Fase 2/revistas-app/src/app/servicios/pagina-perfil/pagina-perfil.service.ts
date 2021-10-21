import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GeneroEnum } from "src/app/objetos/base/GeneroEnum";
import { UsuarioModel } from '../../modelos/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class PaginaPerfilService {
  readonly API_URL = "http://localhost:8080/servidor-revistas/";
    
  constructor(private httpClient: HttpClient) { }

  public obtenerUsuario(username: string | null): Observable<UsuarioModel> {
    return this.httpClient.get<UsuarioModel>(this.API_URL + "obtener-usuario?username="+username);
  }

  public guardarDescripcion(username: string, descripcion: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL + "guardar-descripcion?username="+username+"&descripcion="+descripcion);
  }

  public guardarHobbies(username: string, hobbies: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL + "guardar-hobbies?username="+username+"&hobbies="+hobbies);
  }

  public guardarGenero(username: string, genero: GeneroEnum): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL + "guardar-genero?username="+username+"&genero="+genero);
  }

  public eliminarInformacion(username: string, tipoInformacion: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL + "guardar-"+tipoInformacion+"?username="+username+"&eliminacion=true");
  }
}
