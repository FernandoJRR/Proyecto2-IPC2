import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/objetos/base/Categoria';
import { Etiqueta } from 'src/app/objetos/base/Etiqueta';
import { Revista } from 'src/app/objetos/editor/Revista';
import { PublicacionRevistasService } from 'src/app/servicios/publicacion-revistas/publicacion-revistas.service';
import { etiquetasMinimasSeleccionadas } from './etiquetas-minimas-seleccionadas.validator';

@Component({
  selector: 'app-dialog-publicar-revista',
  templateUrl: './dialog-publicar-revista.component.html',
  styleUrls: ['./dialog-publicar-revista.component.css']
})
export class DialogPublicarRevistaComponent implements OnInit {

  validez: boolean = true;

  formRevista: FormGroup;

  categorias: Array<Categoria> = [];
  etiquetas: Array<Etiqueta> = [];
  etiquetasElegidas: Array<string> = [];

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
        etiquetasSeleccionadas: new FormGroup({}, etiquetasMinimasSeleccionadas())
      })

      this.publicacionService.obtenerCategorias()
      .subscribe(categorias => {
        this.categorias = categorias;
      });

      this.publicacionService.obtenerEtiquetas()
      .subscribe(etiquetas => {
        this.etiquetas = etiquetas;
        this.etiquetas.forEach(etiqueta => {
          (this.formRevista.get("etiquetasSeleccionadas") as FormGroup).addControl("checkBox"+etiqueta.nombre, new FormControl(false));
        });
    });
    }

  ngOnInit() {  }

  guardar(): void {
    if(this.formRevista.valid){
      this.validez = true;
      console.log("valido")
      let precioSuscripcion = this.precioGratis.value? 0 : this.formRevista.controls.precio.value;
      let etiquetasRevista: Array<Etiqueta> = [];
      this.etiquetasElegidas.forEach(nombreEtiqueta => { etiquetasRevista.push( new Etiqueta(nombreEtiqueta)) });

      let revistaCreada = 
      new Revista(
        null,
        this.formRevista.controls.nombre.value,
        this.formRevista.controls.descripcion.value,
        this.formRevista.controls.fechaPublicacion.value,
        this.formRevista.controls.categoria.value,
        etiquetasRevista,
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

  public cambioEtiqueta(evento: any){
    if (evento.currentTarget.checked) {
      this.etiquetasElegidas.push(evento.target.value);
    } else {
      const index = this.etiquetasElegidas.indexOf(evento.target.value, 0);
      if (index > -1) {
         this.etiquetasElegidas.splice(index, 1);
      }
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
