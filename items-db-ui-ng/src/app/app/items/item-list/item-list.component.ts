import { Component, OnInit } from '@angular/core';
import { ItemsApiService } from '../../shared/services/items-api.service';
import { IItem } from '../models/item';

@Component({
  selector: 'idb-items-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {

  public items: IItem[];
  public errorMessage: string;

  constructor(private itemsDataService: ItemsApiService) { }

  ngOnInit(): void {
    const queryStr = ``; // `filter=className='pump'&orderby=tag`;
    this.itemsDataService.getItems(queryStr).subscribe({
      next: items => {
        this.items = items;
        // console.log(items);
      },
      error: errMsg => this.errorMessage = errMsg
    });
  }

}
