import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CostoHosting } from 'src/app/objetos/base/CostoHosting';
import { AdministradorService } from 'src/app/servicios/pagina-administrador/administrador.service';
import { DialogAgregarCostoHostingComponent } from '../dialog-agregar-costo-hosting/dialog-agregar-costo-hosting.component';

@Component({
  selector: 'app-dialog-administrar-costo-hosting',
  templateUrl: './dialog-administrar-costo-hosting.component.html',
  styleUrls: ['./dialog-administrar-costo-hosting.component.css']
})
export class DialogAdministrarCostoHostingComponent implements OnInit {

  columnasTabla: string[] = ['fechaInicio','costo'];
  costosHosting: Array<CostoHosting> = [];

  constructor(
    public dialogRef: MatDialogRef<DialogAdministrarCostoHostingComponent>,
    public costoService: AdministradorService,
    private notificacionSnack: MatSnackBar,
    public dialog: MatDialog) {  }

  ngOnInit(): void {
    this.costoService.obtenerCostos()
    .subscribe(costos => {
      this.costosHosting = costos;
    },((error: any) => {
      console.log(error);
    }));
  }
  
  agregarCosto(): void {
    const dialogRef = this.dialog.open(DialogAgregarCostoHostingComponent, {
      disableClose: true,
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(costo => {
      if (costo != null||""||undefined) {
        this.costoService.agregarCosto(costo)
        .subscribe(resultado => {
          resultado? this.notificar("Costo agregado!"):this.notificar("Ha ocurrido un error")
        },((error:any) => {
          console.log(error);
          this.notificar("Ha ocurrido un error");
        }));
      }
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  notificar(mensaje: string) {
    this.notificacionSnack.open(mensaje, "Cerrar");
  }
}
