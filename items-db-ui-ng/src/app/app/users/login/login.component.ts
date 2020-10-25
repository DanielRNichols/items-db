import { Component, OnInit } from '@angular/core';
import { ItemsApiService } from '../../shared/services/items-api.service';
import { LocalStorageService } from '../../shared/services/localStorage.service';

@Component({
  selector: 'idb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  userName = 'dan@mycompany.com';
  password = '123';
  errorMessage: string;

  constructor(private itemsDataService: ItemsApiService,
              private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {
  }

  public login = () => {
    console.log(`Attempt log in for ${this.userName} with password ${this.password}`);
    this.itemsDataService.login(this.userName, this.password).subscribe({
      next: result => {
        this.localStorageService.setItem('idb:token', result.token);
        console.log(`token = ${result.token}`);
      },
      error: errMsg => this.errorMessage = errMsg

    });
  }

}
