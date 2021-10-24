import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Revista } from "../objetos/editor/Revista";
import { DialogPublicarRevistaComponent } from '../dialogs/pagina-home-editor/dialog-publicar-revista/dialog-publicar-revista.component';
import { PublicacionRevistasService } from '../servicios/publicacion-revistas/publicacion-revistas.service';
import { RevistaModel } from '../modelos/RevistaModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pagina-home-editor',
  templateUrl: './pagina-home-editor.component.html',
  styleUrls: ['./pagina-home-editor.component.css']
})
export class PaginaHomeEditorComponent implements OnInit {

  revistaCreada: Revista | null = null;

  revistasPublicadas: Array<Revista> = [];

  revistaSeleccionada: Revista | null = null;

  constructor(public dialog: MatDialog, private publicarService: PublicacionRevistasService, private notificacionSnack: MatSnackBar) { 
    this.actualizarRevistasCreadas();
  }

  ngOnInit(): void {
  }

  publicarRevista() {
    const dialogRef = this.dialog.open(DialogPublicarRevistaComponent, {
      disableClose: true,
      data: {revista: this.revistaCreada},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(dataObtenida => {
      if (dataObtenida != null && dataObtenida != undefined) {
        console.log(dataObtenida);
        this.publicarService.publicarRevista(new RevistaModel(dataObtenida[0].revista), dataObtenida[0].precioSuscripcion, localStorage.getItem("username")!)
        .subscribe(resultado => {
          if (resultado) {
            this.actualizarRevistasCreadas();
            this.notificar("La revista ha sido publicada exitosamente!");
          }
        },((error: any) => {
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
    this.publicarService.obtenerRevistasPublicadas(localStorage.getItem("username")!)
    .subscribe(revistas => {
      this.revistasPublicadas = revistas;
    });
  }

  revistaAbierta(revistaSeleccionada: Revista) {
    this.revistaSeleccionada = revistaSeleccionada;
    console.log(this.revistaSeleccionada);
  }

  revistaCerrada(){
    this.revistaSeleccionada = null;
  }
}
