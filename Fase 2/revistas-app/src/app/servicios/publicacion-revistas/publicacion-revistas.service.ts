import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RevistaModel } from 'src/app/modelos/RevistaModel';
import { Categoria } from 'src/app/objetos/base/Categoria';
import { Revista } from 'src/app/objetos/editor/Revista';

@Injectable({
  providedIn: 'root'
})
export class PublicacionRevistasService {
    readonly API_URL = "http://localhost:8080/servidor-revistas/";
        
    constructor(private httpClient: HttpClient) { }

    public obtenerCategorias(): Observable<Categoria[]> {
        return this.httpClient.get<Categoria[]>(this.API_URL + "obtener-categorias");
    }

    public publicarRevista(revista: RevistaModel, precioSuscripcion: number, editorUsername: string): Observable<boolean> {
      return this.httpClient.post<boolean>(this.API_URL + "publicar-revista?username="+editorUsername+"&precioSuscripcion="+precioSuscripcion, revista);
    }

    public obtenerRevistasPublicadas(editorUsername: string): Observable<Revista[]> {
      return this.httpClient.get<Revista[]>(this.API_URL + "obtener-revistas-publicadas?username=" + editorUsername);
    }
}
