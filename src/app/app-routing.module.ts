import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
  { path: '', redirectTo: '/listado', pathMatch: 'full' },
  { path: 'listado', component: ClientesComponent },
  { path: 'detalle/:id', component: ClienteDetailComponent },
  { path: 'nuevo', component: ClienteDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
