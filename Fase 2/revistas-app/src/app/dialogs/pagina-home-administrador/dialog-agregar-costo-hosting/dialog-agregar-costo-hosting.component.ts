import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CostoHosting } from 'src/app/objetos/base/CostoHosting';

@Component({
  selector: 'app-dialog-agregar-costo-hosting',
  templateUrl: './dialog-agregar-costo-hosting.component.html',
  styleUrls: ['./dialog-agregar-costo-hosting.component.css']
})
export class DialogAgregarCostoHostingComponent implements OnInit {

  validez: boolean = true;
  formCosto: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAgregarCostoHostingComponent>,
    formBuilder: FormBuilder) {
      
      this.formCosto = formBuilder.group({
        fechaInicio: [null, [Validators.required]],
        porcentaje: [10, [Validators.required, Validators.min(0), Validators.max(100)]],
      });
   }

  ngOnInit(): void {
  }

  guardar(): void {
    this.dialogRef.close(new CostoHosting(this.formCosto.controls.fechaInicio.value, this.formCosto.controls.porcentaje.value));
  }
  
  cerrar(): void {
    this.dialogRef.close();
  }
}
