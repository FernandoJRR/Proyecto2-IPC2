import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Revista } from 'src/app/objetos/editor/Revista';

@Injectable({
  providedIn: 'root'
})
export class PaginaHomeService {
  
  readonly API_URL = "http://localhost:8080/servidor-revistas";
  
  @Output() resultadosEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public obtenerRevistasRecomendadas(usuario: string): Observable<Revista[]> {
    return this.httpClient.get<Revista[]>(this.API_URL+"/obtener-revistas-recomendadas?username="+usuario);
  }
  
  public obtenerRevistasSuscritas(usuario: string): Observable<Revista[]> {
    return this.httpClient.get<Revista[]>(this.API_URL+"/obtener-revistas-suscritas?username="+usuario);
  }
  
  public buscar(tipoBusqueda: String, busqueda: string, usuario: string): Observable<Revista[]> {
    return this.httpClient.get<Revista[]>(this.API_URL+"/buscar?tipoBusqueda="+tipoBusqueda+"&busqueda="+busqueda+"&usuario="+usuario);
  }
}
