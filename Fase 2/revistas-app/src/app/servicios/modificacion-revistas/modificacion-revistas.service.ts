import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrecioSuscripcion } from 'src/app/objetos/editor/PrecioSuscripcion';

@Injectable({
  providedIn: 'root'
})
export class ModificacionRevistasService {
  
  readonly API_URL = "http://localhost:8080/servidor-revistas";

  constructor(private httpClient: HttpClient) { }

  public obtenerPreciosSuscripcion(idRevista: number): Observable<PrecioSuscripcion[]> {
    return this.httpClient.get<PrecioSuscripcion[]>(this.API_URL + "/obtener-precios-suscripcion?id="+idRevista);
  }
  
  public cambiarEstadoSuscripcion(idRevista: number, estado: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL + "/cambiar-estado-suscripcion?id="+idRevista+"&estado="+estado);
  }
  
  public cambiarEstadoMeGusta(idRevista: number, numeroRevista: number, estadoMeGusta: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL + "/cambiar-estado-me-gusta?id="+idRevista+"&numero="+numeroRevista+"&estado="+estadoMeGusta);
  }

  public cambiarEstadoComentarios(idRevista: number, numeroRevista: number, estadoComentarios: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL + "/cambiar-estado-comentarios?id="+idRevista+"&numero="+numeroRevista+"&estado="+estadoComentarios);
  }
}
