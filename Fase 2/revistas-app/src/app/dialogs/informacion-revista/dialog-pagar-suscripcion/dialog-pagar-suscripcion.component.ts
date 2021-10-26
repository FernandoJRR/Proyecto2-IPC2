import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pago } from 'src/app/objetos/base/Pago';
import { Suscripcion } from 'src/app/objetos/base/Suscripcion';

@Component({
  selector: 'app-dialog-pagar-suscripcion',
  templateUrl: './dialog-pagar-suscripcion.component.html',
  styleUrls: ['./dialog-pagar-suscripcion.component.css']
})
export class DialogPagarSuscripcionComponent implements OnInit {

  validez: boolean = true;
  formSuscripcion: FormGroup;
  fechaPublicacionRevista: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogPagarSuscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {suscripcion: Suscripcion},
    formBuilder: FormBuilder) {
      
      this.formSuscripcion = formBuilder.group({
        fechaSuscripcion: [null, [Validators.required]],
        cantidadTiempoPagado: [1, [Validators.required, Validators.min(1)]],
        tipoTiempo: ["MENSUAL", [Validators.required, Validators.min(1)]]
      });
      
      this.fechaPublicacionRevista = new Date(this.data.suscripcion.fechaSuscripcion);
   }

  ngOnInit(): void {
  }
  
  guardar(): void {
    if (this.fechaPublicacionRevista <= this.formSuscripcion.controls.fechaSuscripcion.value) {
      let pagoCreado = 
      new Pago(
        localStorage.getItem("username")!,
        this.data.suscripcion.id,
        this.formSuscripcion.controls.fechaSuscripcion.value,
        this.formSuscripcion.controls.tipoTiempo.value,
        this.formSuscripcion.controls.cantidadTiempoPagado.value
      )

      this.dialogRef.close(pagoCreado);
    } else {
      this.validez = false;
    }
  }
  
  cerrar(): void {
    this.dialogRef.close();
  }
}
