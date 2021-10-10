import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GeneroEnum } from '../objetos/base/GeneroEnum';
import { Usuario } from '../objetos/base/Usuario';
import { validateUsername } from '../registro-editor-form/disponibilidad-username.validator';
import { RegistroUsuariosServicio } from '../servicios/registro-usuarios/registro-usuarios.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario: Usuario;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private registroUsuariosServicio: RegistroUsuariosServicio) { 
    this.usuario = new Usuario("", "", "", "", GeneroEnum.MASCULINO, []);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required, validateUsername(this.registroUsuariosServicio)],
      password: [null, Validators.required],
    });
  }

}
