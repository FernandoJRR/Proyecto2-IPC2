import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/objetos/base/Categoria';
import { Revista } from 'src/app/objetos/editor/Revista';
import { PublicacionRevistasService } from 'src/app/servicios/publicacion-revistas/publicacion-revistas.service';

@Component({
  selector: 'app-dialog-publicar-revista',
  templateUrl: './dialog-publicar-revista.component.html',
  styleUrls: ['./dialog-publicar-revista.component.css']
})
export class DialogPublicarRevistaComponent implements OnInit {

  validez: boolean = true;

  formRevista: FormGroup;

  categorias: Array<Categoria> = [];

  precioGratis = new FormControl(false);


  constructor(
    public dialogRef: MatDialogRef<DialogPublicarRevistaComponent>,
    private publicacionService: PublicacionRevistasService,
    @Inject(MAT_DIALOG_DATA) public data: {descripcion: string},
      formBuilder: FormBuilder) { 

      this.formRevista = formBuilder.group({
        nombre: ["",Validators.required],
        descripcion: [""],
        precio: [1.00,[Validators.required,Validators.min(1)]],
        precioGratis: this.precioGratis,
        fechaPublicacion: [null, Validators.required],
        categoria: [null, Validators.required],
      })

      this.publicacionService.obtenerCategorias()
      .subscribe(categorias => {
        this.categorias = categorias;
      });
    }

  ngOnInit() {  }

  guardar(): void {
    if(this.formRevista.valid){
      this.validez = true;
      console.log("valido")
      let precioSuscripcion = this.precioGratis.value? 0 : this.formRevista.controls.precio.value;
      let revistaCreada = 
      new Revista(
        null,
        this.formRevista.controls.nombre.value,
        this.formRevista.controls.descripcion.value,
        this.formRevista.controls.fechaPublicacion.value,
        this.formRevista.controls.categoria.value,
        null
      );

      let datosRespuesta: {revista: Revista, precioSuscripcion: number}[] = [
        {"revista": revistaCreada, "precioSuscripcion": precioSuscripcion}
      ];
      
      this.dialogRef.close(datosRespuesta);
    } else {
      this.validez = false;
      console.log("invalid")
    }
  }

  changeGratis() {
    if (this.precioGratis.value) {
      this.formRevista.controls.precio.disable();
      this.formRevista.controls.precio.removeValidators(Validators.required);
    } else {
      this.formRevista.controls.precio.enable();
      this.formRevista.controls.precio.addValidators(Validators.required);
      this.formRevista.controls.precio.updateValueAndValidity();
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
