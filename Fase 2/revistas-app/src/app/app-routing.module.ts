import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { PaginaEditorComponent } from './pagina-editor/pagina-editor.component';
import { PaginaHomeComponent } from './pagina-home/pagina-home.component';
import { PaginaLectorComponent } from './pagina-lector/pagina-lector.component';
import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';

import { PaginaRegistroComponent } from "./pagina-registro/pagina-registro.component";
import { RegistroEditorFormComponent } from './registro-editor-form/registro-editor-form.component';
import { RegistroFormComponent } from './registro-usuario-form/registro-usuario-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginFormComponent},
  {path: 'pagina-registro', component: PaginaRegistroComponent},
  {path: 'registro-usuario', component: RegistroFormComponent},
  {path: 'registro-editor', component: RegistroEditorFormComponent},
  {path: 'lector', component: PaginaLectorComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: PaginaHomeComponent},
      {path: 'suscripciones', component: PaginaLectorComponent},
      {path: 'perfil', component: PaginaPerfilComponent}
    ]
  },
  {path: 'editor', component: PaginaEditorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
