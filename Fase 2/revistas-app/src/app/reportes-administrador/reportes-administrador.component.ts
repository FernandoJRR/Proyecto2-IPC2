import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfiguracionReportesAdministradorComponent } from '../dialogs/pagina-home-administrador/dialog-configuracion-reportes-administrador/dialog-configuracion-reportes-administrador.component';

@Component({
  selector: 'app-reportes-administrador',
  templateUrl: './reportes-administrador.component.html',
  styleUrls: ['./reportes-administrador.component.css']
})
export class ReportesAdministradorComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  topSuscripciones(): void{
    const dialogRef = this.dialog.open(DialogConfiguracionReportesAdministradorComponent, {
      disableClose: true,
      data: {tipoReporte: "TOPSUSCRIPCIONES"},
      width: '500px',
    });
  }
  topComentarios(): void{
    const dialogRef = this.dialog.open(DialogConfiguracionReportesAdministradorComponent, {
      disableClose: true,
      data: {tipoReporte: "TOPCOMENTARIOS"},
      width: '500px',
    });
  }
}
