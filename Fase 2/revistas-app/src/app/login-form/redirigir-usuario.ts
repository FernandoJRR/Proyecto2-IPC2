import { Router } from "@angular/router";
import { LoginServicio } from "../servicios/login/login.service";

export function RedirigirUsuario(username: string, loginServicio: LoginServicio, router: Router) {
    loginServicio.obtenerTipoUsuario(username)
    .subscribe((tipo: string) =>{
        if (tipo=="USUARIO") {
          router.navigate(['/lector']);
        } else if (tipo=="EDITOR") {
          router.navigate(['/editor']);
        }
    },(error: any) => {
        console.log("error");      
        console.log(error);      
    })
}