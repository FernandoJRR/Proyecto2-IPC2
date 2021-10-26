import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { PaginaAdministradorComponent } from './pagina-administrador/pagina-administrador.component';
import { PaginaEditorComponent } from './pagina-editor/pagina-editor.component';
import { PaginaHomeAdministradorComponent } from './pagina-home-administrador/pagina-home-administrador.component';
import { PaginaHomeEditorComponent } from './pagina-home-editor/pagina-home-editor.component';
import { PaginaHomeLectorComponent } from './pagina-home-lector/pagina-home-lector.component';
import { PaginaLectorComponent } from './pagina-lector/pagina-lector.component';
import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';

import { PaginaRegistroComponent } from "./pagina-registro/pagina-registro.component";
import { PaginaResultadosComponent } from './pagina-resultados/pagina-resultados.component';
import { PaginaSuscripcionesComponent } from './pagina-suscripciones/pagina-suscripciones.component';
import { RegistroEditorFormComponent } from './registro-editor-form/registro-editor-form.component';
import { RegistroFormComponent } from './registro-usuario-form/registro-usuario-form.component';
import { ReportesEditorComponent } from './reportes-editor/reportes-editor.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginFormComponent},
  {path: 'pagina-registro', component: PaginaRegistroComponent},
  {path: 'registro-usuario', component: RegistroFormComponent},
  {path: 'registro-editor', component: RegistroEditorFormComponent},
  {path: 'lector', component: PaginaLectorComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: PaginaHomeLectorComponent},
      {path: 'suscripciones', component: PaginaSuscripcionesComponent},
      {path: 'resultados', component: PaginaResultadosComponent},
      {path: 'perfil', component: PaginaPerfilComponent}
    ]
  },
  {path: 'editor', component: PaginaEditorComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: PaginaHomeEditorComponent},
      {path: 'reportes', component: ReportesEditorComponent},
      {path: 'perfil', component: PaginaPerfilComponent},
    ]
  },
  {path: 'administrador', component: PaginaAdministradorComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: PaginaHomeAdministradorComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
