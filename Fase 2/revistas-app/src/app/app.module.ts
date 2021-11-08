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
import { MatRadioModule } from "@angular/material/radio";
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
import { DialogSuscribirseRevistaComponent } from './dialogs/informacion-revista/dialog-suscribirse-revista/dialog-suscribirse-revista.component';
import { PaginaSuscripcionesComponent } from './pagina-suscripciones/pagina-suscripciones.component';
import { DialogPagarSuscripcionComponent } from './dialogs/informacion-revista/dialog-pagar-suscripcion/dialog-pagar-suscripcion.component';
import { DialogComentarComponent } from './dialogs/informacion-revista/dialog-comentar/dialog-comentar.component';
import { PaginaResultadosComponent } from './pagina-resultados/pagina-resultados.component';
import { PaginaAdministradorComponent } from './pagina-administrador/pagina-administrador.component';
import { PaginaHomeAdministradorComponent } from './pagina-home-administrador/pagina-home-administrador.component';
import { DialogAgregarCategoriaComponent } from './dialogs/pagina-home-administrador/dialog-agregar-categoria/dialog-agregar-categoria.component';
import { DialogAgregarEtiquetaComponent } from './dialogs/pagina-home-administrador/dialog-agregar-etiqueta/dialog-agregar-etiqueta.component';
import { DialogAgregarAdministradorComponent } from './dialogs/pagina-home-administrador/dialog-agregar-administrador/dialog-agregar-administrador.component';
import { DialogAdministrarCostoHostingComponent } from './dialogs/pagina-home-administrador/dialog-administrar-costo-hosting/dialog-administrar-costo-hosting.component';
import { DialogAgregarCostoHostingComponent } from './dialogs/pagina-home-administrador/dialog-agregar-costo-hosting/dialog-agregar-costo-hosting.component';
import { DialogConfiguracionReportesEditorComponent } from './dialogs/pagina-home-administrador/dialog-configuracion-reportes-editor/dialog-configuracion-reportes-editor.component';
import { ReportesAdministradorComponent } from './reportes-administrador/reportes-administrador.component';
import { DialogConfiguracionReportesAdministradorComponent } from './dialogs/pagina-home-administrador/dialog-configuracion-reportes-administrador/dialog-configuracion-reportes-administrador.component';

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
    DialogSuscribirseRevistaComponent,
    PaginaSuscripcionesComponent,
    DialogPagarSuscripcionComponent,
    DialogComentarComponent,
    PaginaResultadosComponent,
    PaginaAdministradorComponent,
    PaginaHomeAdministradorComponent,
    DialogAgregarCategoriaComponent,
    DialogAgregarEtiquetaComponent,
    DialogAgregarAdministradorComponent,
    DialogAdministrarCostoHostingComponent,
    DialogAgregarCostoHostingComponent,
    DialogConfiguracionReportesEditorComponent,
    ReportesAdministradorComponent,
    DialogConfiguracionReportesAdministradorComponent,
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
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
