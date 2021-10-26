import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogModificarNumeroComponent } from '../dialogs/informacion-numero-revista/dialog-modificar-numero/dialog-modificar-numero.component';
import { DialogVerComentariosComponent } from '../dialogs/informacion-numero-revista/dialog-ver-comentarios/dialog-ver-comentarios.component';
import { DialogComentarComponent } from '../dialogs/informacion-revista/dialog-comentar/dialog-comentar.component';
import { NumeroRevista } from '../objetos/editor/NumeroRevista';
import { FilesService } from '../servicios/archivos/files.service';
import { PublicacionNumerosService } from '../servicios/publicacion-numeros/publicacion-numeros.service';
import { SuscripcionesService } from '../servicios/suscripciones/suscripciones.service';

@Component({
  selector: 'app-informacion-numero-revista',
  templateUrl: './informacion-numero-revista.component.html',
  styleUrls: ['./informacion-numero-revista.component.css']
})
export class InformacionNumeroRevistaComponent implements OnInit {

  @Input() numeroRevista: NumeroRevista | any;
  @Input() tipoUsuario: string | any;
  
  pathPDF!: string;
  
  meGustaNumero: number = 0;

  constructor(public dialog: MatDialog, private informacionService: PublicacionNumerosService, 
              private suscriptoresService: SuscripcionesService, private notificacionSnack: MatSnackBar,
              private fileService: FilesService) {
                
   }

  ngOnInit(): void {
    this.obtenerPDF();
    this.actualizarMeGusta();
  }

  //Metodos Suscriptores
  cambiarMeGusta(): void{
    this.suscriptoresService.cambiarMeGusta(this.numeroRevista.numero,localStorage.getItem("username")!)
    .subscribe(resultado => {
        this.actualizarMeGusta();
    });
  }

  //Metodos Editores

  modificarNumero(): void {
    const dialogRef = this.dialog.open(DialogModificarNumeroComponent, {
      disableClose: true,
      data: {numeroRevista: this.numeroRevista},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(cambios => {
      console.log(cambios);
    });
  }
  
  actualizarMeGusta(): void {
    this.informacionService.obtenerMeGusta(this.numeroRevista.idRevista, this.numeroRevista.numero)
    .subscribe(cantidad => {
      this.meGustaNumero = cantidad;
    },((error:any)=>{
      console.log(error);
    }));
  }
  
  verComentarios(): void {
    const dialogRef = this.dialog.open(DialogVerComentariosComponent, {
      disableClose: true,
      data: {numeroRevista: this.numeroRevista},
      width: '500px',
    });
  }
  
  comentar(): void {
    const dialogRef = this.dialog.open(DialogComentarComponent, {
      disableClose: true,
      data: {numeroRevista: this.numeroRevista},
      width: '500px',
    });
    
    dialogRef.afterClosed()
    .subscribe(comentario => {
      if (comentario != undefined || comentario != "" || comentario != null) {
        this.suscriptoresService.agregarComentario(comentario)
        .subscribe(resultado =>{
          if (resultado) {
            this.notificar("Comentario agregado!");
          }
        },((error:any)=>{
          console.log(error);
          this.notificar("Ha ocurrido un error");
        })); 
      }
    });
  }

  notificar(mensaje: string) {
    this.notificacionSnack.open(mensaje, "Cerrar");
  }
  
  obtenerPDF(): void {
    this.pathPDF = this.fileService.obtenerPDF(this.numeroRevista.numero, 0);
    //this.pathPDF = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  }
}
