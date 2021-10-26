import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isWhileStatement } from 'typescript';
import { DialogModificarRevistaComponent } from '../dialogs/informacion-revista/dialog-modificar-revista/dialog-modificar-revista.component';
import { DialogPagarSuscripcionComponent } from '../dialogs/informacion-revista/dialog-pagar-suscripcion/dialog-pagar-suscripcion.component';
import { DialogPublicarNumeroComponent } from '../dialogs/informacion-revista/dialog-publicar-numero/dialog-publicar-numero.component';
import { DialogSuscribirseRevistaComponent } from '../dialogs/informacion-revista/dialog-suscribirse-revista/dialog-suscribirse-revista.component';
import { NumeroRevista } from '../objetos/editor/NumeroRevista';
import { Revista } from '../objetos/editor/Revista';
import { FilesService } from '../servicios/archivos/files.service';
import { PublicacionNumerosService } from '../servicios/publicacion-numeros/publicacion-numeros.service';
import { SuscripcionesService } from '../servicios/suscripciones/suscripciones.service';

@Component({
  selector: 'app-informacion-revista',
  templateUrl: './informacion-revista.component.html',
  styleUrls: ['./informacion-revista.component.css']
})
export class InformacionRevistaComponent implements OnInit {

  @Input() revista: Revista | any;
  @Input() tipoUsuario: string | any;
  @Output() cambioSuscripcionesEvent = new EventEmitter<boolean>();

  tarjetaAbierta: boolean = false;
  
  numerosRevista: Array<NumeroRevista> = [];

  constructor(public dialog: MatDialog, private publicarService: PublicacionNumerosService, 
              private suscripcionesService: SuscripcionesService,
              private pdfService: FilesService, private notificacionSnack: MatSnackBar) { }

  ngOnInit(): void {
    if (this.tipoUsuario=="EDITOR"||"SUSCRIPTOR") {
      this.actualizarRevistasCreadas();
    }
  }
  
  //Metodods de Lector
  suscribirse() {
    const dialogRef = this.dialog.open(DialogSuscribirseRevistaComponent, {
      disableClose: true,
      data: {revista: this.revista},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(dataObtenida => {
      if (dataObtenida != null && dataObtenida != undefined) {
        let suscripcionCreada = dataObtenida[0].suscripcion;
        let pagoCreado = dataObtenida[0].pago;
        this.suscripcionesService.crearSuscripcion(suscripcionCreada, pagoCreado)
        .subscribe(resultado => {
          if (resultado) {
            this.notificar("Te has suscrito con exito, visita tu revista en la pestaña de Suscripciones!");
            this.cambioSuscripcionesEmitter(true);
          }
        },((error: any) => {
          this.notificar("Ha ocurrido un error");
          console.log(error);
        }));
      }
    });
  }

  cambioSuscripcionesEmitter(value: boolean) {
    this.cambioSuscripcionesEvent.emit(value);
  }
  
  //Metodos de Suscriptor
  pagarSuscripcion(): void {
    this.suscripcionesService.obtenerSuscripcion(this.revista.id, localStorage.getItem("username")!)
    .subscribe(suscripcion => {
      const dialogRef = this.dialog.open(DialogPagarSuscripcionComponent, {
        disableClose: true,
        data: {suscripcion: suscripcion},
        width: '500px',
      });

      dialogRef.afterClosed()
      .subscribe(pago => {
        this.suscripcionesService.agregarPago(pago)
        .subscribe(resultado => {
        this.notificar("Pago exitoso!");
        },((error:any) => {
          console.log(error);
        this.notificar("Ha ocurrido un error");
        }));
      },((error: any) => {
        console.log(error);
        this.notificar("Ha ocurrido un error");
      }));
    });
  }

  //Metodos de Editor
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
      this.numerosRevista = numeros;
    },((error:any) => {
      console.log(error);
    }));
  }
}
