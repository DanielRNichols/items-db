import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UsersRoutingModule } from './users-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
