import { Component, OnInit } from '@angular/core';
import { Revista } from '../objetos/editor/Revista';
import { PaginaHomeService } from '../servicios/pagina-lector/pagina-home.service';

@Component({
  selector: 'app-pagina-suscripciones',
  templateUrl: './pagina-suscripciones.component.html',
  styleUrls: ['./pagina-suscripciones.component.css']
})
export class PaginaSuscripcionesComponent implements OnInit {

  revistasSuscritas: Array<Revista> = [];

  constructor(private homeServices: PaginaHomeService) { }

  ngOnInit(): void {
    this.actualizarRevistasSuscritas();
  }

  actualizarRevistasSuscritas(): void {
    this.homeServices.obtenerRevistasSuscritas(localStorage.getItem("username")!)
    .subscribe(revistas => {
      this.revistasSuscritas = revistas
    });
  }
}
