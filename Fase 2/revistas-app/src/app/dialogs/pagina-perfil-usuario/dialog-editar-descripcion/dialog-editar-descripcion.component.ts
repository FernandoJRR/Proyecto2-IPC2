import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-editar-descripcion',
  templateUrl: './dialog-editar-descripcion.component.html',
  styleUrls: ['./dialog-editar-descripcion.component.css']
})
export class DialogEditarDescripcionComponent implements OnInit{ 

  validez: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarDescripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {descripcion: string}) { }

  ngOnInit() {  }

  guardar(): void {
    if(this.data.descripcion != undefined && this.data.descripcion != "" && this.data.descripcion != null){
      this.dialogRef.close(this.data.descripcion);
    } else {
      this.validez = false;
      console.log("invalid")
      console.log(this.validez)
    }
  }

  eliminar(): void {
    this.dialogRef.close("");
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
