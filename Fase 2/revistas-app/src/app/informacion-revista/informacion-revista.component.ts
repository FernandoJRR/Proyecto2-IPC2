import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogModificarRevistaComponent } from '../dialogs/informacion-revista/dialog-modificar-revista/dialog-modificar-revista.component';
import { DialogPublicarNumeroComponent } from '../dialogs/informacion-revista/dialog-publicar-numero/dialog-publicar-numero.component';
import { NumeroRevista } from '../objetos/editor/NumeroRevista';
import { Revista } from '../objetos/editor/Revista';
import { FilesService } from '../servicios/archivos/files.service';
import { PublicacionNumerosService } from '../servicios/publicacion-numeros/publicacion-numeros.service';

@Component({
  selector: 'app-informacion-revista',
  templateUrl: './informacion-revista.component.html',
  styleUrls: ['./informacion-revista.component.css']
})
export class InformacionRevistaComponent implements OnInit {

  @Input() revista: Revista | any;

  tarjetaAbierta: boolean = false;
  
  numerosPublicados: Array<NumeroRevista> = [];

  constructor(public dialog: MatDialog, private publicarService: PublicacionNumerosService, 
              private pdfService: FilesService, private notificacionSnack: MatSnackBar) { }

  ngOnInit(): void {
    this.actualizarRevistasCreadas();
  }

  mostrarInformacion(): void {
    this.tarjetaAbierta = true;
  }

  ocultarInformacion(): void {
    this.tarjetaAbierta = false;
  }

  modificarRevista(): void { 
    const dialogRef = this.dialog.open(DialogModificarRevistaComponent, {
      disableClose: true,
      data: {revista: this.revista},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(cambios => {
      console.log(cambios);
    });
  }

  publicarNuevoNumero(): void { 
    const dialogRef = this.dialog.open(DialogPublicarNumeroComponent, {
      disableClose: true,
      data: {revista: this.revista},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(dataObtenida => {
      if (dataObtenida != null && dataObtenida != undefined) {
        let numeroCreado = dataObtenida[0].numeroRevista;
        let pdf = dataObtenida[0].archivoPDF;
        
        this.publicarService.publicarNumero(numeroCreado)
        .subscribe(numeroCreado => {
          if (numeroCreado > 0) {
            this.pdfService.uploadPDF(pdf, numeroCreado)
            .subscribe(resultado => {
              if (resultado) {
                this.actualizarRevistasCreadas();
                this.notificar("El numero ha sido publicado exitosamente!");
              }
            },((error:any) => {
              console.log(error);
              this.notificar("Ha ocurrido un error con el PDF");
            }));
          }
        },((error:any) => {
          console.log(error);
          this.notificar("Ha ocurrido un error");
        }));
      }
    });
  }
  
  notificar(mensaje: string) {
    this.notificacionSnack.open(mensaje, "Cerrar");
  }

  actualizarRevistasCreadas(): void { 
    this.publicarService.obtenerNumerosPublicados(this.revista.id)
    .subscribe(numeros => {
      this.numerosPublicados = numeros;
    },((error:any) => {
      console.log(error);
    }));
  }
}
