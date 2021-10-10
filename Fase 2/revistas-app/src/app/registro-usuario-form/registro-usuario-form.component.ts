import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Etiqueta } from '../objetos/base/Etiqueta';
import { GeneroEnum } from '../objetos/base/GeneroEnum';
import { Usuario } from '../objetos/base/Usuario';
import { RegistroUsuariosServicio } from "../servicios/registro-usuarios/registro-usuarios.service";
import { etiquetasMinimasSeleccionadas } from './etiquetas-minimas-seleccionadas.validator';
import { validateUsername } from './disponibilidad-username.validator';

@Component({
  selector: 'app-registro-usuario-form',
  templateUrl: './registro-usuario-form.component.html',
  styleUrls: ['./registro-usuario-form.component.css']
})
export class RegistroFormComponent implements OnInit {

  usuario: Usuario;
  generoEnum = GeneroEnum;
  etiquetas: Array<Etiqueta> = [];
  registroForm!: FormGroup;
  etiquetasElegidas: Array<string> = [];
  
  mensajeError: boolean = false;
  mensajeExito: boolean = true;

  constructor(private formBuilder: FormBuilder, private registroUsuariosServicio: RegistroUsuariosServicio) { 
    this.usuario = new Usuario("", "", "", "", GeneroEnum.MASCULINO, []);
  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      username: [null, Validators.required, validateUsername(this.registroUsuariosServicio)],
      password: [null, Validators.required],
      descripcion: [null],
      hobbies: [null],
      genero: [null],
      etiquetasSeleccionadas: new FormGroup({}, etiquetasMinimasSeleccionadas())
    });
    
    this.registroUsuariosServicio.obtenerEtiquetas()
    .subscribe(etiquetas => {
      this.etiquetas = etiquetas;
      this.etiquetas.forEach(etiqueta => {
        (this.registroForm.get("etiquetasSeleccionadas") as FormGroup).addControl("checkBox"+etiqueta.nombre, new FormControl(false));
      });
    });
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
  
  registroUsuario() {
    if(this.registroForm.valid){
      this.usuario.username = this.registroForm.value.username;
      this.usuario.password = this.registroForm.value.password;

      if (this.registroForm.value.descripcion == "" || this.registroForm.value.descripcion == null) {
        this.usuario.descripcion = null; 
      } else {
        this.usuario.descripcion = this.registroForm.value.descripcion;
      }

      if (this.registroForm.value.hobbies == "" || this.registroForm.value.hobbies == null) {
        this.usuario.hobbies = null; 
      } else {
        this.usuario.hobbies = this.registroForm.value.hobbies;
      }

      this.usuario.genero = this.registroForm.value.genero;
      this.etiquetasElegidas.forEach(nombreEtiqueta => { this.usuario.etiquetas.push( new Etiqueta(nombreEtiqueta)) });
      this.registroUsuariosServicio.registrarUsuario(this.usuario)
      .subscribe((created: boolean) => {
        if (created) {
          console.log("creado")
          this.registroForm.reset();
          this.usuario = new Usuario("", "", "", "", GeneroEnum.MASCULINO, []);
          this.mensajeExito = true;
        }
      },(error:any) =>{
          console.log("error")
          console.log(error)
          this.mensajeError = true;
      });
    }
  }
}