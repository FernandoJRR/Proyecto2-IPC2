import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-editar-hobbies',
  templateUrl: './dialog-editar-hobbies.component.html',
  styleUrls: ['./dialog-editar-hobbies.component.css']
})
export class DialogEditarHobbiesComponent implements OnInit {

  validez: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarHobbiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {hobbies: string}) { }

  ngOnInit() {  }

  guardar(): void {
    if(this.data.hobbies != undefined && this.data.hobbies != "" && this.data.hobbies != null){
      this.dialogRef.close(this.data.hobbies);
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

