import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-agregar-categoria',
  templateUrl: './dialog-agregar-categoria.component.html',
  styleUrls: ['./dialog-agregar-categoria.component.css']
})
export class DialogAgregarCategoriaComponent implements OnInit {

  validez: boolean = true;
  categoriaForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogAgregarCategoriaComponent>, private formBuilder: FormBuilder) { 
    this.categoriaForm = this.formBuilder.group({
      nombre: ["",Validators.required],
    })
  }

  ngOnInit(): void {
  }

  guardar(): void {
    if (this.categoriaForm.value.nombre != null||""||undefined) {
      this.dialogRef.close(this.categoriaForm.value.nombre);
    } else {
      this.validez = false;
    }
  }
  cerrar(): void {
    this.dialogRef.close();
  }
}
