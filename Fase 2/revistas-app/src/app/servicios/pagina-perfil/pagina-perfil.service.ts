import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
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
}
