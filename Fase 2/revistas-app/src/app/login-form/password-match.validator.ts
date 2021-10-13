import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginServicio } from "../servicios/login/login.service";

export function matcherPassword(servicioValidador: LoginServicio): AsyncValidatorFn {
    return (loginForm: AbstractControl): Observable<ValidationErrors | null> => {
        let username = (loginForm as FormGroup).controls.username.value;
        let password = (loginForm as FormGroup).controls.password.value;
        return servicioValidador.matchPassword(username,password)
        .pipe(map(respuesta =>
            respuesta? null : {invalido: true} as ValidationErrors
        ));
    }
}