import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-editar-foto-perfil',
  templateUrl: './dialog-editar-foto-perfil.component.html',
  styleUrls: ['./dialog-editar-foto-perfil.component.css']
})
export class DialogEditarFotoPerfilComponent implements OnInit {

  validez: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarFotoPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {foto: File}) {  }

  ngOnInit() {  }

  cargar(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files != null) {
      this.data.foto = files.item(0)!;
    } else {
      this.validez = false;
    }
  }

  guardar(): void {
    if(this.data.foto != undefined && this.data.foto != null){
      this.dialogRef.close(this.data.foto);
    } else {
      this.validez = false;
    }
  }

  eliminar(): void {
    this.dialogRef.close(null);
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
