import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginaHomeService } from '../servicios/pagina-lector/pagina-home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: string | null = localStorage.getItem('username');
  tipoUsuario: string | null = localStorage.getItem('tipoUsuario');
  
  busquedaForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private homeService: PaginaHomeService) { }

  ngOnInit(): void {
    this.busquedaForm = this.formBuilder.group({
      tipoBusqueda: ["CATEGORIA",Validators.required],
      busqueda: [""],
    });
  }
  
  buscar(): void {
    this.router.navigate(['/lector/resultados']);
    this.homeService.buscar(this.busquedaForm.value.tipoBusqueda,this.busquedaForm.value.busqueda, localStorage.getItem("username")!)
    .subscribe(revistas => {
      this.homeService.resultadosEmitter.emit({
        data: revistas,
      });
    });
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
