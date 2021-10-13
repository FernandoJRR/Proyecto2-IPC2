import { AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RegistroUsuariosServicio } from "./../servicios/registro-usuarios/registro-usuarios.service";

export function existenciaUsername(servicioValidador: RegistroUsuariosServicio): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
     return servicioValidador.checkDisponibilidadUsuario(control.value)
     .pipe(map(respuesta => 
        respuesta==control.value? null : {noExiste: true} as ValidationErrors
      ));
  }
}