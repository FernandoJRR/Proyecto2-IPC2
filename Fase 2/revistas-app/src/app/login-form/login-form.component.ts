import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GeneroEnum } from '../objetos/base/GeneroEnum';
import { Usuario } from '../objetos/base/Usuario';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario: Usuario;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.usuario = new Usuario("", "", "", new Date, GeneroEnum.MASCULINO, []);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

}
