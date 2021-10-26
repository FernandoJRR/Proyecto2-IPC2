import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-agregar-etiqueta',
  templateUrl: './dialog-agregar-etiqueta.component.html',
  styleUrls: ['./dialog-agregar-etiqueta.component.css']
})
export class DialogAgregarEtiquetaComponent implements OnInit {

  validez: boolean = true;
  etiquetaForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogAgregarEtiquetaComponent>, private formBuilder: FormBuilder) { 
    this.etiquetaForm = this.formBuilder.group({
      nombre: ["",Validators.required],
    })
  }

  ngOnInit(): void {
  }

  guardar(): void {
    if (this.etiquetaForm.value.nombre != null||""||undefined) {
      this.dialogRef.close(this.etiquetaForm.value.nombre);
    } else {
      this.validez = false;
    }
  }
  cerrar(): void {
    this.dialogRef.close();
  }
}
