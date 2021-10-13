import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { existenciaUsername} from '../login-form/existencia-username.validator';
import { RegistroUsuariosServicio } from '../servicios/registro-usuarios/registro-usuarios.service';
import { matcherPassword } from './password-match.validator';
import { LoginServicio } from '../servicios/login/login.service';
import { UserPasswordModel } from '../modelos/UserPasswordModel';
import { Router } from '@angular/router';
import { validezUsuario } from './validez-username.validator';
import { RedirigirUsuario } from './redirigir-usuario';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario: UserPasswordModel;
  loginForm!: FormGroup;
  mensajeNoMatch: boolean = false;
  mensajeError: boolean = false;

  constructor(private formBuilder: FormBuilder, private registroUsuariosServicio: RegistroUsuariosServicio, private loginServicio: LoginServicio, private router: Router) { 
    this.usuario = new UserPasswordModel("","");
  }

  ngOnInit(): void {
    localStorage.getItem('username')==null? null : RedirigirUsuario(localStorage.getItem('username') as string, this.loginServicio, this.router); 

    this.loginForm = this.formBuilder.group({
      username: [null, 
                { 
                  validators: [Validators.required], 
                  asyncValidators: [existenciaUsername(this.registroUsuariosServicio), validezUsuario(this.loginServicio)], 
                  updateOn: 'blur'
                }],
      password: [null, { validators: [Validators.required], updateOn: 'blur'}],
    });
    
    this.loginForm.addAsyncValidators(matcherPassword(this.loginServicio));
    this.loginForm.updateValueAndValidity();
  }
  
  login() {
    if (this.loginForm.valid) {
      this.mensajeNoMatch = false;
      this.usuario.username = this.loginForm.controls.username.value
      this.usuario.password = this.loginForm.controls.password.value
      this.loginServicio.obtenerTipoUsuario(this.usuario.username)
      .subscribe((tipo: string) =>{
        this.mensajeError = false;
        localStorage.clear();
        localStorage.setItem('username', this.usuario.username);
        if (tipo=="USUARIO") {
          this.loginForm.reset();
          this.router.navigate(['/lector']);
        } else if (tipo=="EDITOR") {
          this.loginForm.reset();
          this.router.navigate(['/editor']);
        }
      },(error: any) => {
        console.log("error");      
        console.log(error);      
        this.mensajeError = true;
      })
    } else {
      this.mensajeNoMatch = true;
    }
  }
}
