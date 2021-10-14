import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-lector',
  templateUrl: './pagina-lector.component.html',
  styleUrls: ['./pagina-lector.component.css']
})
export class PaginaLectorComponent implements OnInit {

  usuario: string | null = localStorage.getItem('username');

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.usuario==null? this.router.navigate(['/login']) : null;
  }
  
  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
