import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'idb-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  title = 'Items Db';
  constructor() { }

  ngOnInit(): void {
  }

}
