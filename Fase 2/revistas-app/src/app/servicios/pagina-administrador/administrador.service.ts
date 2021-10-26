import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  readonly API_URL = "http://localhost:8080/servidor-revistas";

  constructor(private httpClient: HttpClient) { }
  
  public agregarCategoria(nombreCategoria: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL+"/agregar-categoria?nombre="+nombreCategoria);
  }
  public agregarEtiqueta(nombreEtiqueta: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL+"/agregar-etiqueta?nombre="+nombreEtiqueta);
  }
}
