import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Revista } from 'src/app/objetos/editor/Revista';

@Injectable({
  providedIn: 'root'
})
export class PaginaHomeService {
  
  readonly API_URL = "http://localhost:8080/servidor-revistas";

  constructor(private httpClient: HttpClient) { }

  public obtenerRevistasRecomendadas(usuario: string): Observable<Revista[]> {
    return this.httpClient.get<Revista[]>(this.API_URL+"/obtener-revistas-recomendadas?username="+usuario);
  }
}
