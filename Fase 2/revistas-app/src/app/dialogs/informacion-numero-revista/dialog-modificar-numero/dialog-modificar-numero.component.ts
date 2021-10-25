import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumeroRevista } from 'src/app/objetos/editor/NumeroRevista';
import { ModificacionRevistasService } from 'src/app/servicios/modificacion-revistas/modificacion-revistas.service';
import { DialogModificarEstadoComentariosComponent } from './dialog-modificar-estado-comentarios/dialog-modificar-estado-comentarios.component';
import { DialogModificarEstadoMeGustaComponent } from './dialog-modificar-estado-me-gusta/dialog-modificar-estado-me-gusta.component';

@Component({
  selector: 'app-dialog-modificar-numero',
  templateUrl: './dialog-modificar-numero.component.html',
  styleUrls: ['./dialog-modificar-numero.component.css']
})
export class DialogModificarNumeroComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<DialogModificarNumeroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {numeroRevista: NumeroRevista, pdf: File},
    private modificacionService: ModificacionRevistasService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  cargar(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files != null) {
      this.data.pdf = files.item(0)!;
    }
  }
  
  editarEstadoMeGusta() {
    const dialogRef = this.dialog.open(DialogModificarEstadoMeGustaComponent, {
      disableClose: true,
      data: {estadoMeGusta: this.data.numeroRevista.restriccionMeGusta},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(cambios => {
      if (cambios != undefined && cambios != null && cambios != "") {
        this.modificacionService.cambiarEstadoMeGusta(this.data.numeroRevista.idRevista, this.data.numeroRevista.numero!, cambios)
        .subscribe(resultado => {
          if (resultado) {
            this.data.numeroRevista.restriccionMeGusta = cambios;
          }
        },((error:any)=>{
          console.log(error);
        }));
      }
    },((error:any) => {
      console.log(error);
    }));
  }
  
  editarEstadoComentarios() {
    const dialogRef = this.dialog.open(DialogModificarEstadoComentariosComponent, {
      disableClose: true,
      data: {estadoComentarios: this.data.numeroRevista.restriccionComentarios},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(cambios => {
      if (cambios != undefined && cambios != null && cambios != "") {
        this.modificacionService.cambiarEstadoComentarios(this.data.numeroRevista.idRevista, this.data.numeroRevista.numero!, cambios)
        .subscribe(resultado => {
          if (resultado) {
            this.data.numeroRevista.restriccionComentarios = cambios;
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
