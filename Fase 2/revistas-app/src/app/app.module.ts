import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistroFormComponent } from './registro-usuario-form/registro-usuario-form.component';
import { PaginaRegistroComponent } from './pagina-registro/pagina-registro.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroEditorFormComponent } from './registro-editor-form/registro-editor-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginaLectorComponent } from './pagina-lector/pagina-lector.component';
import { PaginaEditorComponent } from './pagina-editor/pagina-editor.component';
import { HeaderComponent } from './header/header.component';
import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';
import { PaginaHomeComponent } from './pagina-home/pagina-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogEditarDescripcionComponent } from './dialogs/pagina-perfil-usuario/dialog-editar-descripcion/dialog-editar-descripcion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DialogEditarHobbiesComponent } from './dialogs/pagina-perfil-usuario/dialog-editar-hobbies/dialog-editar-hobbies.component';
import { DialogEditarGeneroComponent } from './dialogs/pagina-perfil-usuario/dialog-editar-genero/dialog-editar-genero.component';
import { DialogEditarEtiquetasComponent } from './dialogs/pagina-perfil-usuario/dialog-editar-etiquetas/dialog-editar-etiquetas.component';
import { DialogEditarFotoPerfilComponent } from './dialogs/pagina-perfil-usuario/dialog-editar-foto-perfil/dialog-editar-foto-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistroFormComponent,
    PaginaRegistroComponent,
    RegistroEditorFormComponent,
    PaginaLectorComponent,
    PaginaEditorComponent,
    HeaderComponent,
    PaginaPerfilComponent,
    PaginaHomeComponent,
    DialogEditarDescripcionComponent,
    DialogEditarHobbiesComponent,
    DialogEditarGeneroComponent,
    DialogEditarEtiquetasComponent,
    DialogEditarFotoPerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
