import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemEditComponent } from './item-edit/item-edit.component';



@NgModule({
  declarations: [ItemListComponent, ItemDetailsComponent, ItemEditComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule
  ]
})
export class ItemsModule { }
