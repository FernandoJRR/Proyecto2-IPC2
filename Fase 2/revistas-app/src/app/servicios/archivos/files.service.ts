import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  readonly API_URL = "http://localhost:8080/servidor-revistas";

  constructor(private httpClient: HttpClient) { }

  public uploadFile(file: File, username: string): Observable<boolean> {
    const formData: FormData = new FormData();

    formData.append("datafile", file, file.name);

    return this.httpClient.post<boolean>(this.API_URL + "/upload-file?username="+username, formData);
  }

  public deleteFile(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API_URL + "/upload-file?username="+username);
  }

  public obtenerFotoDePerfil(username: string, marca: number): string {
    let urlImagen = this.API_URL+"/show-file?username="+username+"&marca="+marca;
    return urlImagen;
  }
  
  public uploadPDF(pdf: File, numeroRevista: number): Observable<boolean> {
    const formData: FormData = new FormData();

    formData.append("datafile", pdf, pdf.name);

    return this.httpClient.post<boolean>(this.API_URL + "/upload-pdf?numero="+numeroRevista, formData);
  }
  
  public obtenerPDF(numeroRevista: number, marca: number): string {
    let urlPDF = this.API_URL+"/mostrar-pdf?numeroRevista="+numeroRevista+"&marca="+marca;
    return urlPDF;
  }
}
