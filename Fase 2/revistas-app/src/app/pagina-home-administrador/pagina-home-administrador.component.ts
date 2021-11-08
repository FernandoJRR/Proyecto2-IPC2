import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAdministrarCostoHostingComponent } from '../dialogs/pagina-home-administrador/dialog-administrar-costo-hosting/dialog-administrar-costo-hosting.component';
import { DialogAgregarAdministradorComponent } from '../dialogs/pagina-home-administrador/dialog-agregar-administrador/dialog-agregar-administrador.component';
import { DialogAgregarCategoriaComponent } from '../dialogs/pagina-home-administrador/dialog-agregar-categoria/dialog-agregar-categoria.component';
import { DialogAgregarEtiquetaComponent } from '../dialogs/pagina-home-administrador/dialog-agregar-etiqueta/dialog-agregar-etiqueta.component';
import { AdministradorService } from '../servicios/pagina-administrador/administrador.service';

@Component({
  selector: 'app-pagina-home-administrador',
  templateUrl: './pagina-home-administrador.component.html',
  styleUrls: ['./pagina-home-administrador.component.css']
})
export class PaginaHomeAdministradorComponent implements OnInit {

  constructor(public dialog: MatDialog, private administradorService: AdministradorService, private notificacionSnack: MatSnackBar) { }

  ngOnInit(): void {
  }

  administrarCostosHosting(): void{
    const dialogRef = this.dialog.open(DialogAdministrarCostoHostingComponent, {
      disableClose: true,
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(nombre => {
      if (nombre != null||""||undefined) {
        this.administradorService.agregarCategoria(nombre)
        .subscribe(resultado => {
          resultado? this.notificar("Categoria agregada!"):this.notificar("Ha ocurrido un error")
        },((error:any) => {
          console.log(error);
          this.notificar("Ha ocurrido un error");
        }));
      }
    });
  }

  agregarCategoria(): void{
    const dialogRef = this.dialog.open(DialogAgregarCategoriaComponent, {
      disableClose: true,
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(nombre => {
      if (nombre != null||""||undefined) {
        this.administradorService.agregarCategoria(nombre)
        .subscribe(resultado => {
          resultado? this.notificar("Categoria agregada!"):this.notificar("Ha ocurrido un error")
        },((error:any) => {
          console.log(error);
          this.notificar("Ha ocurrido un error");
        }));
      }
    });
  }
  agregarEtiqueta(): void{
    const dialogRef = this.dialog.open(DialogAgregarEtiquetaComponent, {
      disableClose: true,
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(nombre => {
        if (nombre != null||""||undefined) {
        this.administradorService.agregarEtiqueta(nombre)
        .subscribe(resultado => {
          resultado? this.notificar("Etiqueta agregada!"):this.notificar("Ha ocurrido un error")
        },((error:any) => {
          console.log(error);
          this.notificar("Ha ocurrido un error");
        }));
      }
    });
    
  }
  agregarAdministrador(): void{
    const dialogRef = this.dialog.open(DialogAgregarAdministradorComponent, {
      disableClose: true,
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(cambios => {
      console.log(cambios);
    });
  }

  notificar(mensaje: string) {
    this.notificacionSnack.open(mensaje, "Cerrar");
  }
}
