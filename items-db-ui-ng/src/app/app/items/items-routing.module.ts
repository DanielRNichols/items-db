import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemEditComponent } from './item-edit/item-edit.component';

const routes: Routes = [
  { path: 'items',   component: ItemListComponent},
  { path: 'items/:id/edit', component: ItemEditComponent},
  { path: 'items/:id', component: ItemDetailsComponent}

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ItemsRoutingModule { }
