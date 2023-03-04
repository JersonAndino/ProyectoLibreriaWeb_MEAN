import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { DetalleLibroComponent } from './components/detalle-libro/detalle-libro.component';
import { EditarLibroComponent } from './components/editar-libro/editar-libro.component';
import { HomeComponent } from './components/home/home.component';
import { LibrosComponent } from './components/libros/libros.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';

const routes: Routes = [
  {path:'inicio',component:HomeComponent},
  {path:'libros',component:LibrosComponent},
  {path:'guardar-libro',component:CrearLibroComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'libro/:id',component:DetalleLibroComponent},
  {path:'editar-libro/:id',component:EditarLibroComponent},
  {path:'guardar-usuario',component:CrearUsuarioComponent},
  {path:'login',component:LoginComponent},
  {path:'crear-cuenta',component:CrearCuentaComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
