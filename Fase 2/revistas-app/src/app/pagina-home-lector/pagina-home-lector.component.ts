import { Component, OnInit } from '@angular/core';
import { Revista } from '../objetos/editor/Revista';
import { PaginaHomeService } from '../servicios/pagina-lector/pagina-home.service';

@Component({
  selector: 'app-pagina-home-lector',
  templateUrl: './pagina-home-lector.component.html',
  styleUrls: ['./pagina-home-lector.component.css']
})
export class PaginaHomeLectorComponent implements OnInit {

  revistasRecomendadas: Array<Revista> = [];

  constructor(private homeServices: PaginaHomeService) { }

  ngOnInit(): void {
    this.actualizarRevistasRecomendadas();
  }
  
  cambioSuscripciones(cambio: boolean) {
    if (cambio) {
      this.actualizarRevistasRecomendadas();
    }
  }

  actualizarRevistasRecomendadas(): void {
    this.homeServices.obtenerRevistasRecomendadas(localStorage.getItem("username")!)
    .subscribe(revistas => {
      this.revistasRecomendadas = revistas
    });
  }
}
