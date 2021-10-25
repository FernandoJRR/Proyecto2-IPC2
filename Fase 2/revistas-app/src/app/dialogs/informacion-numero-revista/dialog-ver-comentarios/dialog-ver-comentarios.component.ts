import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumeroRevista } from 'src/app/objetos/editor/NumeroRevista';
import { Comentario } from 'src/app/objetos/revista/Comentario';
import { PublicacionNumerosService } from 'src/app/servicios/publicacion-numeros/publicacion-numeros.service';

@Component({
  selector: 'app-dialog-ver-comentarios',
  templateUrl: './dialog-ver-comentarios.component.html',
  styleUrls: ['./dialog-ver-comentarios.component.css']
})
export class DialogVerComentariosComponent implements OnInit {

  comentariosNumero: Array<Comentario> = [];

  constructor(
    public dialogRef: MatDialogRef<DialogVerComentariosComponent>,
    private informacionService: PublicacionNumerosService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {numeroRevista: NumeroRevista}) {  }

  ngOnInit(): void {
    this.informacionService.obtenerComentarios(this.data.numeroRevista.idRevista, this.data.numeroRevista.numero!)
    .subscribe(comentarios => {
      this.comentariosNumero = comentarios;
    },((error:any) => {
      console.log(error);
    }));
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
