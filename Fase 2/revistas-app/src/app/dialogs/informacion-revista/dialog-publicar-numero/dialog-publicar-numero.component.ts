import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumeroRevista } from 'src/app/objetos/editor/NumeroRevista';
import { Revista } from 'src/app/objetos/editor/Revista';
import { PublicacionRevistasService } from 'src/app/servicios/publicacion-revistas/publicacion-revistas.service';

@Component({
  selector: 'app-dialog-publicar-numero',
  templateUrl: './dialog-publicar-numero.component.html',
  styleUrls: ['./dialog-publicar-numero.component.css']
})
export class DialogPublicarNumeroComponent implements OnInit {

  validez: boolean = true;

  formRevista: FormGroup;
  
  fechaPublicacionRevista: Date;
  
  constructor(
    public dialogRef: MatDialogRef<DialogPublicarNumeroComponent>,
    private publicacionService: PublicacionRevistasService,
    @Inject(MAT_DIALOG_DATA) public data: {revista: Revista, pdf: File},
      formBuilder: FormBuilder) { 

      this.formRevista = formBuilder.group({
        nombre: ["",Validators.required],
        descripcion: [""],
        fechaPublicacion: [null, [Validators.required, Validators.min(4)]],
        pdf: [null, Validators.required],
      });
      
      this.fechaPublicacionRevista = new Date(this.data.revista.fechaPublicacion);
    }

  ngOnInit() {  }

  guardar(): void {
    if (this.fechaPublicacionRevista <= this.formRevista.controls.fechaPublicacion.value) {
      console.log("valido");
      let descripcion = this.formRevista.controls.descripcion.value;
      let numeroCreado = 
        new NumeroRevista(
          null, //Aun no se asigna un numero a la revista
          this.data.revista.id!, //Se coloca el id de la revista a la que pertenece
          this.formRevista.controls.nombre.value, //Se coloca el nombre ingresado de la revista
          (descripcion==""||descripcion==null||descripcion==undefined)? null:descripcion, //Si no se ingreso descripcion sera null
          this.formRevista.controls.fechaPublicacion.value, //Se coloca la fecha de publicacion ingresada
          "", //Aun no se crea el path del PDF de la revista
          0, //Se coloca el precio de hosting de la revista
          null, //De base no hay restricciones sobre me gusta o comentarios;
          null
        );
      
      let datosRespuesta: {numeroRevista: NumeroRevista, archivoPDF: File}[] = [
        {"numeroRevista": numeroCreado, "archivoPDF": this.data.pdf}
      ];

      this.dialogRef.close(datosRespuesta);
    } else {
      this.validez = false;
    }
  }

  cargar(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files != null) {
      this.data.pdf = files.item(0)!;
    } else {
      this.validez = false;
    }
  }
  
  cerrar(): void {
    this.dialogRef.close();
  }
}
