import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsApiService } from '../../shared/services/items-api.service';
import { IItem } from '../models/item';


@Component({
  selector: 'idb-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.sass']
})
export class ItemDetailsComponent implements OnInit {

  item: IItem;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private itemsApiService: ItemsApiService) {
  }

  ngOnInit(): void {
    const idParam: string = this.activatedRoute.snapshot.paramMap.get('id');
    const id = parseInt(idParam, 10);
    const item = this.itemsApiService.getItem(id).subscribe({
      next: retItem => {
        this.item = retItem;
        console.log(this.item);
      },
      error: errMsg => this.errorMessage = errMsg
    });
  }

}
