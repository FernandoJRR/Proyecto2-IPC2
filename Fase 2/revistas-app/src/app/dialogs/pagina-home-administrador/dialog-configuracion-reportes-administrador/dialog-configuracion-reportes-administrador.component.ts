import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneracionReporteAdministradorModel } from 'src/app/modelos/GeneracionReporteAdministracionModel';
import { Revista } from 'src/app/objetos/editor/Revista';
import { AdministradorService } from 'src/app/servicios/pagina-administrador/administrador.service';

@Component({
  selector: 'app-dialog-configuracion-reportes-administrador',
  templateUrl: './dialog-configuracion-reportes-administrador.component.html',
  styleUrls: ['./dialog-configuracion-reportes-administrador.component.css']
})
export class DialogConfiguracionReportesAdministradorComponent implements OnInit {

  validez: boolean = true;
  formReporte: FormGroup;
  
  reporte: File|null = null;
  
  revistas: Array<Revista> = [];

  constructor(
    public dialogRef: MatDialogRef<DialogConfiguracionReportesAdministradorComponent>,
    private adminService: AdministradorService,
    @Inject(MAT_DIALOG_DATA) public data: {tipoReporte: string},
    formBuilder: FormBuilder) {
      
      this.formReporte = formBuilder.group({
        rangoFechas: new FormGroup({
          desde: new FormControl(''),
          hasta: new FormControl('')
        }),
        revista: [""],
      });
      
      this.adminService.obtenerRevistas()
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
    new GeneracionReporteAdministradorModel(
      this.formReporte.controls['rangoFechas'].value.desde=="" ? null : this.formReporte.controls['rangoFechas'].value.desde,
      this.formReporte.controls['rangoFechas'].value.hasta=="" ? null : this.formReporte.controls['rangoFechas'].value.hasta,
      this.formReporte.controls.revista.value=="" ? null : this.formReporte.controls.revista.value,
    );
    this.adminService.generarReporteAdministrador(dataReporte, this.data.tipoReporte)
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
