import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Revista } from '../objetos/editor/Revista';
import { PaginaHomeService } from '../servicios/pagina-lector/pagina-home.service';

@Component({
  selector: 'app-pagina-resultados',
  templateUrl: './pagina-resultados.component.html',
  styleUrls: ['./pagina-resultados.component.css']
})
export class PaginaResultadosComponent implements OnInit {

  resultados: Revista[] = [];

  constructor(private homeService: PaginaHomeService, private router: Router) { 
    this.homeService.resultadosEmitter
    .subscribe(resultados => {
      this.resultados = resultados.data;
    });
  }

  ngOnInit(): void {
  }

  cambioSuscripciones(cambio: boolean) {
    if (cambio) {
      this.router.navigate(['/lector/home']);
    }
  }
}
