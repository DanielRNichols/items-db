import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [WelcomeComponent, AboutComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
