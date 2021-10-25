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
import { PaginaHomeLectorComponent } from './pagina-home-lector/pagina-home-lector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogEditarDescripcionComponent } from './dialogs/pagina-perfil-usuario/dialog-editar-descripcion/dialog-editar-descripcion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { DialogEditarHobbiesComponent } from './dialogs/pagina-perfil-usuario/dialog-editar-hobbies/dialog-editar-hobbies.component';
import { DialogEditarGeneroComponent } from './dialogs/pagina-perfil-usuario/dialog-editar-genero/dialog-editar-genero.component';
import { DialogEditarEtiquetasComponent } from './dialogs/pagina-perfil-usuario/dialog-editar-etiquetas/dialog-editar-etiquetas.component';
import { DialogEditarFotoPerfilComponent } from './dialogs/pagina-perfil-usuario/dialog-editar-foto-perfil/dialog-editar-foto-perfil.component';
import { PaginaHomeEditorComponent } from './pagina-home-editor/pagina-home-editor.component';
import { ReportesEditorComponent } from './reportes-editor/reportes-editor.component';
import { DialogPublicarRevistaComponent } from './dialogs/pagina-home-editor/dialog-publicar-revista/dialog-publicar-revista.component';
import { InformacionRevistaComponent } from './informacion-revista/informacion-revista.component';
import { DialogModificarRevistaComponent } from './dialogs/informacion-revista/dialog-modificar-revista/dialog-modificar-revista.component';
import { DialogPublicarNumeroComponent } from './dialogs/informacion-revista/dialog-publicar-numero/dialog-publicar-numero.component';
import { DialogModificarEstadoSuscripcionesComponent } from './dialogs/informacion-revista/dialog-modificar-revista/dialog-modificar-estado-suscripciones/dialog-modificar-estado-suscripciones.component';
import { InformacionNumeroRevistaComponent } from './informacion-numero-revista/informacion-numero-revista.component';
import { DialogModificarNumeroComponent } from './dialogs/informacion-numero-revista/dialog-modificar-numero/dialog-modificar-numero.component';
import { DialogModificarEstadoMeGustaComponent } from './dialogs/informacion-numero-revista/dialog-modificar-numero/dialog-modificar-estado-me-gusta/dialog-modificar-estado-me-gusta.component';
import { DialogModificarEstadoComentariosComponent } from './dialogs/informacion-numero-revista/dialog-modificar-numero/dialog-modificar-estado-comentarios/dialog-modificar-estado-comentarios.component';
import { DialogVerComentariosComponent } from './dialogs/informacion-numero-revista/dialog-ver-comentarios/dialog-ver-comentarios.component';

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
    PaginaHomeLectorComponent,
    DialogEditarDescripcionComponent,
    DialogEditarHobbiesComponent,
    DialogEditarGeneroComponent,
    DialogEditarEtiquetasComponent,
    DialogEditarFotoPerfilComponent,
    PaginaHomeEditorComponent,
    ReportesEditorComponent,
    DialogPublicarRevistaComponent,
    InformacionRevistaComponent,
    DialogModificarRevistaComponent,
    DialogPublicarNumeroComponent,
    DialogModificarEstadoSuscripcionesComponent,
    InformacionNumeroRevistaComponent,
    DialogModificarNumeroComponent,
    DialogModificarEstadoMeGustaComponent,
    DialogModificarEstadoComentariosComponent,
    DialogVerComentariosComponent,
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
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
