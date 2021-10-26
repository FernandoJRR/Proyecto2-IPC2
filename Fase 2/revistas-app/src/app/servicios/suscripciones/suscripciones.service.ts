import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioModel } from 'src/app/modelos/ComentarioModel';
import { PagoModel } from 'src/app/modelos/PagoModel';
import { SuscripcionModel } from 'src/app/modelos/SuscripcionModel';
import { Pago } from 'src/app/objetos/base/Pago';
import { Suscripcion } from 'src/app/objetos/base/Suscripcion';
import { Revista } from 'src/app/objetos/editor/Revista';
import { Comentario } from 'src/app/objetos/revista/Comentario';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionesService {

  readonly API_URL = "http://localhost:8080/servidor-revistas";

  constructor(private httpClient: HttpClient) { }

  public crearSuscripcion(suscripcion: Suscripcion, pago: Pago): Observable<boolean> {
    let model = new SuscripcionModel(suscripcion);
    return this.httpClient.post<boolean>(this.API_URL+"/crear-suscripcion?periodo="+pago.periodo+"&tiempo="+pago.tiempoPagado, model);
  }
  
  public cambiarMeGusta(numeroRevista: number,username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL+"/cambiar-me-gusta?username="+username+"&numero="+numeroRevista);
  }
  
  public obtenerSuscripcion(idRevista: number, username: String): Observable<Suscripcion> {
    return this.httpClient.get<Suscripcion>(this.API_URL+"/obtener-suscripcion?username="+username+"&id="+idRevista);
  }
  
  public agregarPago(pago: Pago): Observable<boolean> {
    let model = new PagoModel(pago);
    return this.httpClient.post<boolean>(this.API_URL+"/agregar-pago",model);
  }
  
  public agregarComentario(comentario: Comentario): Observable<boolean> {
    let model = new ComentarioModel(comentario);
    return this.httpClient.post<boolean>(this.API_URL+"/agregar-comentario",model);
  }
}
