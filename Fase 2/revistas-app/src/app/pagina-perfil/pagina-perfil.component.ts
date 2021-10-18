import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { GeneroEnum } from '../objetos/base/GeneroEnum';
import { Usuario } from '../objetos/base/Usuario';
import { PaginaPerfilService } from '../servicios/pagina-perfil/pagina-perfil.service';

@Component({
  selector: 'app-pagina-perfil',
  templateUrl: './pagina-perfil.component.html',
  styleUrls: ['./pagina-perfil.component.css']
})
export class PaginaPerfilComponent implements OnInit {

  username: string | null = localStorage.getItem('username');

  usuario: UsuarioModel;

  descripcion: string = "";
  hobbies: string = "";
  genero: string = "";

  constructor(private servicioPerfil: PaginaPerfilService) { 
    this.usuario = new UsuarioModel(new Usuario("","","","",GeneroEnum.MASCULINO,[]));
  }

  ngOnInit(): void {
    this.servicioPerfil.obtenerUsuario(localStorage.getItem('username'))
    .subscribe((usuarioRecibido: UsuarioModel) => {
      this.usuario = usuarioRecibido;

      this.descripcion = this.usuario.descripcion!; 
      this.hobbies = this.usuario.hobbies!; 
      this.genero = this.usuario.genero!; 
    },((error: any) => {
      console.log("error");
      console.log(error);
    }));
  }

}
