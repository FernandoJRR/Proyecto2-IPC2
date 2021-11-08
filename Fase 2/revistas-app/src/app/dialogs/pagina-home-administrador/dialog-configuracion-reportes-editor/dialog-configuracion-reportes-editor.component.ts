import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneracionReporteEditorModel } from 'src/app/modelos/GeneracionReporteEditorModel';
import { Revista } from 'src/app/objetos/editor/Revista';
import { AdministradorService } from 'src/app/servicios/pagina-administrador/administrador.service';
import { PublicacionRevistasService } from 'src/app/servicios/publicacion-revistas/publicacion-revistas.service';

@Component({
  selector: 'app-dialog-configuracion-reportes-editor',
  templateUrl: './dialog-configuracion-reportes-editor.component.html',
  styleUrls: ['./dialog-configuracion-reportes-editor.component.css']
})
export class DialogConfiguracionReportesEditorComponent implements OnInit {

  validez: boolean = true;
  formReporte: FormGroup;
  
  reporte: File|null = null;
  
  revistas: Array<Revista> = [];

  constructor(
    public dialogRef: MatDialogRef<DialogConfiguracionReportesEditorComponent>,
    private adminService: AdministradorService,
    private revistasService: PublicacionRevistasService,
    @Inject(MAT_DIALOG_DATA) public data: {tipoReporte: string},
    formBuilder: FormBuilder) {
      
      this.formReporte = formBuilder.group({
        rangoFechas: new FormGroup({
          desde: new FormControl(''),
          hasta: new FormControl('')
        }),
        revista: [""],
      });
      
      this.revistasService.obtenerRevistasPublicadas(localStorage.getItem("username")!)
      .subscribe(revistas => {
        this.revistas = revistas;
      },((error: any) => {
        console.log(error);
      }));
    }

  ngOnInit(): void {
  }

  generar(): void {
    let dataReporte =
    new GeneracionReporteEditorModel(
      this.formReporte.controls['rangoFechas'].value.desde=="" ? null : this.formReporte.controls['rangoFechas'].value.desde,
      this.formReporte.controls['rangoFechas'].value.hasta=="" ? null : this.formReporte.controls['rangoFechas'].value.hasta,
      this.formReporte.controls.revista.value=="" ? null : this.formReporte.controls.revista.value,
      localStorage.getItem("username")!
    );
    this.adminService.generarReporte(dataReporte, this.data.tipoReporte)
    .subscribe(reporte => {
      const file = new Blob([reporte], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    },((error:any) => {
      console.log(error);
    }));
  }
  
  cerrar(): void {
    this.dialogRef.close();
  }
}
