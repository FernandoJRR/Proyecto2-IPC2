import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-modificar-estado-suscripciones',
  templateUrl: './dialog-modificar-estado-suscripciones.component.html',
  styleUrls: ['./dialog-modificar-estado-suscripciones.component.css']
})
export class DialogModificarEstadoSuscripcionesComponent implements OnInit {

  validez: boolean = true;
  
  estados: string[] = ["PERMITIDAS","RESTRINGIDAS"];

  constructor(
    public dialogRef: MatDialogRef<DialogModificarEstadoSuscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {estadoSuscripciones: string}) { }

  ngOnInit() {  }

  guardar(): void {
    if(this.data.estadoSuscripciones != undefined && this.data.estadoSuscripciones != "" && this.data.estadoSuscripciones != null){
      this.dialogRef.close(this.data.estadoSuscripciones);
    } else {
      this.validez = false;
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
