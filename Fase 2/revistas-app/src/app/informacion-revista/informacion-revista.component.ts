import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogModificarRevistaComponent } from '../dialogs/informacion-revista/dialog-modificar-revista/dialog-modificar-revista.component';
import { Revista } from '../objetos/editor/Revista';

@Component({
  selector: 'app-informacion-revista',
  templateUrl: './informacion-revista.component.html',
  styleUrls: ['./informacion-revista.component.css']
})
export class InformacionRevistaComponent implements OnInit {

  @Input() revista: Revista | any;

  tarjetaAbierta: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
}
