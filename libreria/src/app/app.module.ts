import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { PieComponent } from './components/pie/pie.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LibrosComponent } from './components/libros/libros.component';
import { DetalleLibroComponent } from './components/detalle-libro/detalle-libro.component';
import { EditarLibroComponent } from './components/editar-libro/editar-libro.component';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';
import { DepositoComponent } from './components/deposito/deposito.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EncabezadoComponent,
    PieComponent,
    ContactoComponent,
    LibrosComponent,
    DetalleLibroComponent,
    EditarLibroComponent,
    CrearLibroComponent,
    CrearUsuarioComponent,
    LoginComponent,
    CrearCuentaComponent,
    TransaccionComponent,
    DepositoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
