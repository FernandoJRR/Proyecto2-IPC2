import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-modificar-estado-me-gusta',
  templateUrl: './dialog-modificar-estado-me-gusta.component.html',
  styleUrls: ['./dialog-modificar-estado-me-gusta.component.css']
})
export class DialogModificarEstadoMeGustaComponent implements OnInit {

  validez: boolean = true;
  
  estados: string[] = ["PERMITIDO","PROHIBIDO"];

  constructor(
    public dialogRef: MatDialogRef<DialogModificarEstadoMeGustaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {estadoMeGusta: string}) { }

  ngOnInit() {  }

  guardar(): void {
    if(this.data.estadoMeGusta != undefined && this.data.estadoMeGusta != "" && this.data.estadoMeGusta != null){
      this.dialogRef.close(this.data.estadoMeGusta);
    } else {
      this.validez = false;
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
