import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '',   component: WelcomeComponent},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', component: WelcomeComponent}

];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class HomeRoutingModule { }
