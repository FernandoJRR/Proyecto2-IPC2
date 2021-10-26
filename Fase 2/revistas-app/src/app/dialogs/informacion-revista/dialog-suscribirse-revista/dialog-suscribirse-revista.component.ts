import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pago } from 'src/app/objetos/base/Pago';
import { Suscripcion } from 'src/app/objetos/base/Suscripcion';
import { Revista } from 'src/app/objetos/editor/Revista';

@Component({
  selector: 'app-dialog-suscribirse-revista',
  templateUrl: './dialog-suscribirse-revista.component.html',
  styleUrls: ['./dialog-suscribirse-revista.component.css']
})
export class DialogSuscribirseRevistaComponent implements OnInit {

  validez: boolean = true;
  formSuscripcion: FormGroup;
  fechaPublicacionRevista: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogSuscribirseRevistaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {revista: Revista},
    formBuilder: FormBuilder) {
      
      this.formSuscripcion = formBuilder.group({
        fechaSuscripcion: [null, [Validators.required, Validators.min(4)]],
        cantidadTiempoPagado: [1, [Validators.required, Validators.min(1)]],
        tipoTiempo: ["MENSUAL", [Validators.required, Validators.min(1)]]
      });
      
      this.fechaPublicacionRevista = new Date(this.data.revista.fechaPublicacion);
   }

  ngOnInit(): void {
  }
  
  guardar(): void {
    if (this.fechaPublicacionRevista <= this.formSuscripcion.controls.fechaSuscripcion.value) {
      let suscripcionCreada =
      new Suscripcion(
        0,
        localStorage.getItem("username")!,
        this.data.revista.id!,
        this.formSuscripcion.controls.fechaSuscripcion.value,
        null
      );

      let pagoCreado = 
      new Pago(
        localStorage.getItem("username")!,
        0,
        this.formSuscripcion.controls.fechaSuscripcion.value,
        this.formSuscripcion.controls.tipoTiempo.value,
        this.formSuscripcion.controls.cantidadTiempoPagado.value
      )

      let datosRespuesta: {suscripcion: Suscripcion, pago: Pago}[] = [
        {"suscripcion": suscripcionCreada, "pago": pagoCreado}
      ];

      this.dialogRef.close(datosRespuesta);
    } else {
      this.validez = false;
    }
  }
  
  cerrar(): void {
    this.dialogRef.close();
  }
}
