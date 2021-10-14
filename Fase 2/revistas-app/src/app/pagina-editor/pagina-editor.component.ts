import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-editor',
  templateUrl: './pagina-editor.component.html',
  styleUrls: ['./pagina-editor.component.css']
})
export class PaginaEditorComponent implements OnInit {

  usuario: string | null = localStorage.getItem('username');
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.usuario==null? this.router.navigate(['/login']) : null;
  }

}
