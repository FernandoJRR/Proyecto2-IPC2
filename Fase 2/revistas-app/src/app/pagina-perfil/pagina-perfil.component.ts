import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DialogEditarDescripcionComponent } from '../dialogs/pagina-perfil-usuario/dialog-editar-descripcion/dialog-editar-descripcion.component';
import { DialogEditarFotoPerfilComponent } from '../dialogs/pagina-perfil-usuario/dialog-editar-foto-perfil/dialog-editar-foto-perfil.component';
import { DialogEditarGeneroComponent } from '../dialogs/pagina-perfil-usuario/dialog-editar-genero/dialog-editar-genero.component';
import { DialogEditarHobbiesComponent } from '../dialogs/pagina-perfil-usuario/dialog-editar-hobbies/dialog-editar-hobbies.component';
import { EtiquetaModel } from '../modelos/EtiquetaModel';
import { UsuarioModel } from '../modelos/UsuarioModel';
import { GeneroEnum } from '../objetos/base/GeneroEnum';
import { Usuario } from '../objetos/base/Usuario';
import { FilesService } from '../servicios/archivos/files.service';
import { PaginaPerfilService } from '../servicios/pagina-perfil/pagina-perfil.service';

@Component({
  selector: 'app-pagina-perfil',
  templateUrl: './pagina-perfil.component.html',
  styleUrls: ['./pagina-perfil.component.css']
})
export class PaginaPerfilComponent implements OnInit {

  username: string | null = localStorage.getItem('username');
  tipoUsuario: string | null = localStorage.getItem('tipoUsuario');

  usuario: UsuarioModel;

  foto: File | null = null;
  descripcion: string = "";
  hobbies: string = "";
  genero: string = "";
  etiquetas: Array<EtiquetaModel> = [];

  urlFotoPerfil: string | null = "";
  marca: number = 0;

  constructor(private servicioPerfil: PaginaPerfilService, private fileService: FilesService, public dialog: MatDialog) { 
    this.usuario = new UsuarioModel(new Usuario("","","","",GeneroEnum.MASCULINO,[]));
  }

  ngOnInit(): void {
    this.servicioPerfil.obtenerUsuario(localStorage.getItem('username'))
    .subscribe((usuarioRecibido: UsuarioModel) => {
      this.usuario = usuarioRecibido;

      this.marca > 3? this.marca = 0 : this.marca++;
      this.urlFotoPerfil = this.fileService.obtenerFotoDePerfil(this.usuario.username, this.marca);
      
      this.descripcion = this.usuario.descripcion!; 
      this.hobbies = this.usuario.hobbies!; 
      this.genero = this.usuario.genero!; 
      if (this.tipoUsuario=="USUARIO") {
        this.etiquetas = this.usuario.etiquetas!;
      }
    },((error: any) => {
      console.log("error");
      console.log(error);
    }));
  }

  editarFotoDePerfil() {
    const dialogRef = this.dialog.open(DialogEditarFotoPerfilComponent, {
      disableClose: true,
      data: {foto: this.foto},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(foto => {
      if(foto == null){
        this.fileService.deleteFile(this.usuario.username)
        .subscribe(resultado => {
          if (resultado) {
            this.urlFotoPerfil = "";
          }
        },((error: any) =>{
          console.log(error)
        }));
      }else if (foto != undefined){
        this.fileService.uploadFile(foto, this.usuario.username)
        .subscribe(resultado => {
          if (resultado) {
            this.marca > 3? this.marca = 0 : this.marca++;
            this.urlFotoPerfil = this.fileService.obtenerFotoDePerfil(this.usuario.username, this.marca);
          }
        },((error: any) => {
          console.log(error);
        }));
      }
    });
  }

  editarDescripcion() {
    const dialogRef = this.dialog.open(DialogEditarDescripcionComponent, {
      disableClose: true,
      data: {descripcion: this.descripcion},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(cambios => {
      if (cambios == "") {
        this.servicioPerfil.eliminarInformacion(this.usuario.username, "descripcion")
        .subscribe(resultado => {
          if (resultado) {
            this.descripcion = cambios;
          }
        },((error: any) => {
          console.log(error);
        }));
      } else if (cambios != null && cambios != undefined && cambios != this.descripcion) {
        this.servicioPerfil.guardarDescripcion(this.usuario.username, cambios)
        .subscribe(resultado => {
          if (resultado) {
            this.descripcion = cambios;
          }
        },((error: any) => {
          console.log(error);
        }));
      }
    });
  }

  editarHobbies() {
    const dialogRef = this.dialog.open(DialogEditarHobbiesComponent, {
      disableClose: true,
      data: {hobbies: this.hobbies},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(cambios => {
      if (cambios == "") {
        this.servicioPerfil.eliminarInformacion(this.usuario.username, "hobbies")
        .subscribe(resultado => {
          if (resultado) {
            this.hobbies = cambios;
          }
        },((error: any) => {
          console.log(error);
        }));
      }else if (cambios != null && cambios != undefined && cambios != this.hobbies) {
        this.servicioPerfil.guardarHobbies(this.usuario.username, cambios)
        .subscribe(resultado => {
          if (resultado) {
            this.hobbies = cambios;
          }
        },((error: any) => {
          console.log(error);
        }));
      }
    });
  }

  editarGenero() {
    const dialogRef = this.dialog.open(DialogEditarGeneroComponent, {
      disableClose: true,
      data: {genero: this.genero},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(cambios => {
      if (cambios == "") {
        this.servicioPerfil.eliminarInformacion(this.usuario.username, "genero")
        .subscribe(resultado => {
          if (resultado) {
            this.genero = cambios;
          }
        },((error: any) => {
          console.log(error);
        }));
      }else if (cambios != null && cambios != undefined && cambios != this.genero) {
        this.servicioPerfil.guardarGenero(this.usuario.username, cambios)
        .subscribe(resultado => {
          if (resultado) {
            this.genero = cambios;
          }
        },((error: any) => {
          console.log(error);
        }));
      }
    });
  }
}
