import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ContactosComponent } from './contactos/contactos.component';
import { InventarioComponent } from './inventario/inventario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProdmedComponent } from './prodmed/prodmed.component';
import { AlglinComponent } from './alglin/alglin.component';
import { AlgmulComponent } from './algmul/algmul.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PedidosComponent,
    ContactosComponent,
    InventarioComponent,
    HeaderComponent,
    FooterComponent,
    ProdmedComponent,
    AlglinComponent,
    AlgmulComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
    ,FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
