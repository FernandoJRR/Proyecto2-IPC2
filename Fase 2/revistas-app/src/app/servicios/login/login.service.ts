import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserPasswordModel } from "src/app/modelos/UserPasswordModel";

@Injectable({
    providedIn: 'root'
})
export class LoginServicio {
    readonly API_URL = "http://localhost:8080/servidor-revistas/";
        
    constructor(private httpClient: HttpClient) {  }
    
    public validezUsername(username: string): Observable<boolean> {
        return this.httpClient.get<boolean>(this.API_URL + "validez-login?username="+username);
    }

    public matchPassword(username: string, password: string): Observable<boolean> {
        let model = new UserPasswordModel(username, password);
        return this.httpClient.post<boolean>(this.API_URL + "validez-login", model);
    }
    
    public obtenerTipoUsuario(username: String): Observable<string> {
        return this.httpClient.get<string>(this.API_URL + "obtener-tipo-usuario?username="+username);
    }
}