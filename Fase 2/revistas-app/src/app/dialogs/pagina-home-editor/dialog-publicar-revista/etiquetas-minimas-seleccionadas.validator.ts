import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function etiquetasMinimasSeleccionadas(): ValidatorFn{
    return (formCheckboxes: AbstractControl): ValidationErrors | null => {
        let cantidadSeleccionados = 0;
        
        Object.keys((formCheckboxes as FormGroup).controls).forEach(key => {
            const control = (formCheckboxes as FormGroup).controls[key];
            
            if (control.value === true) {
                cantidadSeleccionados++;
            }
        });
        
        if (cantidadSeleccionados < 1) {
            return {invalidez: true};
        }
        
        return null;
    }
}