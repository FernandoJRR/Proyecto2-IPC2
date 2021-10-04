import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneroEnum } from '../objetos/base/GeneroEnum';
import { Usuario } from '../objetos/base/Usuario';

@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.css']
})
export class RegistroFormComponent implements OnInit {

  usuario: Usuario;
  generoEnum = GeneroEnum;
  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.usuario = new Usuario("", "", "", new Date, GeneroEnum.MASCULINO, []);
  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      genero: [null]
    });
  }

}
