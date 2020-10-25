import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './app/home/home.module';
import { ItemsModule } from './app/items/items.module';
import { SharedModule } from './app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,

    // HomeModule needs to be last because it defines wildcard routes
    ItemsModule,
    HomeModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }