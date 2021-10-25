import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrecioSuscripcion } from 'src/app/objetos/editor/PrecioSuscripcion';
import { Revista } from 'src/app/objetos/editor/Revista';
import { ModificacionRevistasService } from 'src/app/servicios/modificacion-revistas/modificacion-revistas.service';
import { DialogModificarEstadoSuscripcionesComponent } from './dialog-modificar-estado-suscripciones/dialog-modificar-estado-suscripciones.component';

@Component({
  selector: 'app-dialog-modificar-revista',
  templateUrl: './dialog-modificar-revista.component.html',
  styleUrls: ['./dialog-modificar-revista.component.css']
})
export class DialogModificarRevistaComponent implements OnInit {

  preciosSuscripcion: Array<PrecioSuscripcion> = [];

  columnasTabla: string[] = ['fechaInicio','precio'];

  constructor(
    public dialogRef: MatDialogRef<DialogModificarRevistaComponent>,
    private modificacionService: ModificacionRevistasService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {revista: Revista}) {  }

  ngOnInit(): void {
    this.modificacionService.obtenerPreciosSuscripcion(this.data.revista.id!)
    .subscribe(precios => {
      this.preciosSuscripcion = precios;
    },((error: any) => {
      console.log(error);
    }));
  }

  editarNombre(): void {

  }

  editarDescripcion(): void {

  }

  editarCategoria(): void {

  }

  editarPrecioSuscripcion(): void {

  }

  editarEstadoDeSuscripciones(): void {
    const dialogRef = this.dialog.open(DialogModificarEstadoSuscripcionesComponent, {
      disableClose: true,
      data: {estadoSuscripciones: this.data.revista.estadoSuscripciones},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(cambios => {
      if (cambios != undefined && cambios != null && cambios != "") {
        this.modificacionService.cambiarEstadoSuscripcion(this.data.revista.id!, cambios)
        .subscribe(resultado => {
          if (resultado) {
            this.data.revista.estadoSuscripciones = cambios;
          }
        },((error:any)=>{
          console.log(error);
        }));
      }
    },((error:any) => {
      console.log(error);
    }));
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
