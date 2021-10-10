import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from '../objetos/base/Editor';
import { Etiqueta } from '../objetos/base/Etiqueta';
import { GeneroEnum } from '../objetos/base/GeneroEnum';
import { RegistroUsuariosServicio } from "../servicios/registro-usuarios/registro-usuarios.service";
import { validateUsername } from './disponibilidad-username.validator';

@Component({
  selector: 'app-registro-editor-form',
  templateUrl: './registro-editor-form.component.html',
  styleUrls: ['./registro-editor-form.component.css']
})
export class RegistroEditorFormComponent implements OnInit {

  editor: Editor;
  generoEnum = GeneroEnum;
  etiquetas: Array<Etiqueta> = [];
  registroForm!: FormGroup;
  etiquetasElegidas: Array<string> = [];
  
  mensajeError: boolean = false;
  mensajeExito: boolean = false;

  constructor(private formBuilder: FormBuilder, private registroUsuariosServicio: RegistroUsuariosServicio) { 
    this.editor = new Editor("", "", "", "", GeneroEnum.MASCULINO);
  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      username: [null, Validators.required, validateUsername(this.registroUsuariosServicio)],
      password: [null, Validators.required],
      descripcion: [null],
      hobbies: [null],
      genero: [null],
    });
  }

  registroUsuario() {
    if(this.registroForm.valid){
      this.editor.username = this.registroForm.value.username;
      this.editor.password = this.registroForm.value.password;

      if (this.registroForm.value.descripcion == "" || this.registroForm.value.descripcion == null) {
        this.editor.descripcion = null; 
      } else {
        this.editor.descripcion = this.registroForm.value.descripcion;
      }

      if (this.registroForm.value.hobbies == "" || this.registroForm.value.hobbies == null) {
        this.editor.hobbies = null; 
      } else {
        this.editor.hobbies = this.registroForm.value.hobbies;
      }

      this.editor.genero = this.registroForm.value.genero;
      this.registroUsuariosServicio.registrarEditor(this.editor)
      .subscribe((created: boolean) => {
        if (created) {
          console.log("creado")
          this.registroForm.reset();
          this.editor = new Editor("", "", "", "", GeneroEnum.MASCULINO);
          this.mensajeExito = true;
          this.mensajeError = false;
        }
      },(error:any) =>{
          console.log("error")
          console.log(error)
          this.mensajeError = true;
      });
    }
  }

}