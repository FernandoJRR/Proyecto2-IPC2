import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneroEnum } from 'src/app/objetos/base/GeneroEnum';

@Component({
  selector: 'app-dialog-editar-genero',
  templateUrl: './dialog-editar-genero.component.html',
  styleUrls: ['./dialog-editar-genero.component.css']
})
export class DialogEditarGeneroComponent implements OnInit {

  validez: boolean = true;
  generoEnum = GeneroEnum;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarGeneroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {genero: string}) { }

  ngOnInit() {  }

  guardar(): void {
    if(this.data.genero != undefined && this.data.genero != "" && this.data.genero != null){
      this.dialogRef.close(this.data.genero);
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
