import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  ConfirmBoxConfigModule,
  NgxAwesomePopupModule,
} from '@costlydeveloper/ngx-awesome-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClientesComponent } from './clientes/clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ClienteDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    NgxAwesomePopupModule.forRoot(), // Esencial, módulo obligatorio para usar cualquier otro de ngx-awesome-popup
    ConfirmBoxConfigModule.forRoot(), // Necesario para instanciar confirm boxes
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
