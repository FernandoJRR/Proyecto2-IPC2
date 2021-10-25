import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NumeroRevistaModel } from 'src/app/modelos/NumeroRevistaModel';
import { NumeroRevista } from 'src/app/objetos/editor/NumeroRevista';
import { Comentario } from 'src/app/objetos/revista/Comentario';
import { FilesService } from '../archivos/files.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionNumerosService {
  
  readonly API_URL = "http://localhost:8080/servidor-revistas/";

  constructor(private httpClient: HttpClient) { }
  
  public publicarNumero(numero: NumeroRevista): Observable<number> {
    let modelo = new NumeroRevistaModel(numero);
    return this.httpClient.post<number>(this.API_URL + "publicar-numero", modelo);
  }
  
  public obtenerNumerosPublicados(idRevista: number): Observable<NumeroRevista[]> {
    return this.httpClient.get<NumeroRevista[]>(this.API_URL+"obtener-numeros-revista?id="+idRevista);
  }
  
  public obtenerMeGusta(idRevista: number, numeroRevista: number): Observable<number> {
    return this.httpClient.get<number>(this.API_URL + "obtener-me-gusta?id="+idRevista+"&numero="+numeroRevista);
  }

  public obtenerComentarios(idRevista: number, numeroRevista: number): Observable<Comentario[]> {
    return this.httpClient.get<Comentario[]>(this.API_URL + "obtener-comentarios?id="+idRevista+"&numero="+numeroRevista);
  }
}
