import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogModificarNumeroComponent } from '../dialogs/informacion-numero-revista/dialog-modificar-numero/dialog-modificar-numero.component';
import { DialogVerComentariosComponent } from '../dialogs/informacion-numero-revista/dialog-ver-comentarios/dialog-ver-comentarios.component';
import { NumeroRevista } from '../objetos/editor/NumeroRevista';
import { PublicacionNumerosService } from '../servicios/publicacion-numeros/publicacion-numeros.service';

@Component({
  selector: 'app-informacion-numero-revista',
  templateUrl: './informacion-numero-revista.component.html',
  styleUrls: ['./informacion-numero-revista.component.css']
})
export class InformacionNumeroRevistaComponent implements OnInit {

  @Input() numeroRevista: NumeroRevista | any;
  
  meGustaNumero: number = 0;

  constructor(public dialog: MatDialog, private informacionService: PublicacionNumerosService) { }

  ngOnInit(): void {
    this.informacionService.obtenerMeGusta(this.numeroRevista.idRevista, this.numeroRevista.numero)
    .subscribe(cantidad => {
      this.meGustaNumero = cantidad;
    },((error:any)=>{
      console.log(error);
    }));
  }

  modificarNumero(): void {
    const dialogRef = this.dialog.open(DialogModificarNumeroComponent, {
      disableClose: true,
      data: {numeroRevista: this.numeroRevista},
      width: '500px',
    });

    dialogRef.afterClosed()
    .subscribe(cambios => {
      console.log(cambios);
    });
  }
  
  verComentarios(): void {
    const dialogRef = this.dialog.open(DialogVerComentariosComponent, {
      disableClose: true,
      data: {numeroRevista: this.numeroRevista},
      width: '500px',
    });
  }
}
