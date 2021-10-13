import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginServicio } from "../servicios/login/login.service";

export function validezUsuario(servicioValidador: LoginServicio): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return servicioValidador.validezUsername(control.value)
     .pipe(map(respuesta => 
        respuesta? null : {invalido: true} as ValidationErrors
      ));
  }
}