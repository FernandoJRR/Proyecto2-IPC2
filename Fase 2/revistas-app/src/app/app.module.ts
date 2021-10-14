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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
