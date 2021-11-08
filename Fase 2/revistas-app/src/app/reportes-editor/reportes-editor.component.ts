import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfiguracionReportesEditorComponent } from '../dialogs/pagina-home-administrador/dialog-configuracion-reportes-editor/dialog-configuracion-reportes-editor.component';
import { Revista } from '../objetos/editor/Revista';

@Component({
  selector: 'app-reportes-editor',
  templateUrl: './reportes-editor.component.html',
  styleUrls: ['./reportes-editor.component.css']
})
export class ReportesEditorComponent implements OnInit {
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  reporteComentarios(): void{
    const dialogRef = this.dialog.open(DialogConfiguracionReportesEditorComponent, {
      disableClose: true,
      data: {tipoReporte: "COMENTARIOS"},
      width: '500px',
    });
  }
  reporteSuscripciones(): void{
    const dialogRef = this.dialog.open(DialogConfiguracionReportesEditorComponent, {
      disableClose: true,
      data: {tipoReporte: "SUSCRIPCIONES"},
      width: '500px',
    });
  }
  reporteMeGusta(): void{
    const dialogRef = this.dialog.open(DialogConfiguracionReportesEditorComponent, {
      disableClose: true,
      data: {tipoReporte: "MEGUSTA"},
      width: '500px',
    });
  }
  reporteGanancias(): void{
    const dialogRef = this.dialog.open(DialogConfiguracionReportesEditorComponent, {
      disableClose: true,
      data: {tipoReporte: "GANANCIAS"},
      width: '500px',
    });
  }
}
