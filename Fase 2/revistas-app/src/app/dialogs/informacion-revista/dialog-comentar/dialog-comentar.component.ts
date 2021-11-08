import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumeroRevista } from 'src/app/objetos/editor/NumeroRevista';
import { Comentario } from 'src/app/objetos/revista/Comentario';

@Component({
  selector: 'app-dialog-comentar',
  templateUrl: './dialog-comentar.component.html',
  styleUrls: ['./dialog-comentar.component.css']
})
export class DialogComentarComponent implements OnInit {

  validez: boolean = true;
  formComentario: FormGroup;
  fechaPublicacionRevista: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogComentarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {numeroRevista: NumeroRevista},
    formBuilder: FormBuilder) {
      
      this.formComentario = formBuilder.group({
        fechaPublicacion: [null, [Validators.required]],
        comentario: ["", [Validators.required]],
      });

      this.fechaPublicacionRevista = new Date(this.data.numeroRevista.fechaPublicacion);
   }

  ngOnInit(): void {
  }
  
  guardar(): void {
    if (this.fechaPublicacionRevista <= this.formComentario.controls.fechaPublicacion.value) {
      this.dialogRef.close(
        new Comentario(
          0,
          localStorage.getItem("username")!,
          this.data.numeroRevista.idRevista,
          this.data.numeroRevista.numero!,
          this.formComentario.controls.comentario.value,
          this.formComentario.controls.fechaPublicacion.value
        ));
    } else {
      this.validez = false;
    }
  }
  
  cerrar(): void {
    this.dialogRef.close();
  }
}
