import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CostoHostingModel } from 'src/app/modelos/CostoHostingModel';
import { GeneracionReporteAdministradorModel } from 'src/app/modelos/GeneracionReporteAdministracionModel';
import { GeneracionReporteEditorModel } from 'src/app/modelos/GeneracionReporteEditorModel';
import { CostoHosting } from 'src/app/objetos/base/CostoHosting';
import { Revista } from 'src/app/objetos/editor/Revista';

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
  
  public agregarCosto(costoHosting: CostoHosting): Observable<boolean> {
    let model: CostoHostingModel = new CostoHostingModel(costoHosting);
    return this.httpClient.post<boolean>(this.API_URL+"/agregar-costo",model);
  }
  
  public obtenerCostos(): Observable<CostoHosting[]> {
    return this.httpClient.get<CostoHosting[]>(this.API_URL+"/obtener-costos-hosting");
  }
  
  public obtenerRevistas(): Observable<Revista[]> {
    return this.httpClient.get<Revista[]>(this.API_URL+"/obtener-revistas");
  }
  
  public generarReporte(datosReporte: GeneracionReporteEditorModel, tipoReporte: string): Observable<any> {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.httpClient.post<any>(this.API_URL+"/generar-reporte?tipo="+tipoReporte,datosReporte,httpOptions);
  }
  
  public generarReporteAdministrador(datosReporte: GeneracionReporteAdministradorModel, tipoReporte: string): Observable<any> {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.httpClient.post<any>(this.API_URL+"/generar-reporte-administrador?tipo="+tipoReporte,datosReporte,httpOptions);
  }
}
