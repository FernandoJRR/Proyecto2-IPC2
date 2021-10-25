import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-modificar-estado-comentarios',
  templateUrl: './dialog-modificar-estado-comentarios.component.html',
  styleUrls: ['./dialog-modificar-estado-comentarios.component.css']
})
export class DialogModificarEstadoComentariosComponent implements OnInit {

  validez: boolean = true;
  
  estados: string[] = ["PERMITIDO","PROHIBIDO"];

  constructor(
    public dialogRef: MatDialogRef<DialogModificarEstadoComentariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {estadoComentarios: string}) { }

  ngOnInit() {  }

  guardar(): void {
    if(this.data.estadoComentarios != undefined && this.data.estadoComentarios != "" && this.data.estadoComentarios != null){
      this.dialogRef.close(this.data.estadoComentarios);
    } else {
      this.validez = false;
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
