import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'idb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  title = 'About Page';

  constructor() { }

  ngOnInit(): void {
  }

}
