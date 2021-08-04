import { Component, OnInit } from '@angular/core';
//import { Session } from 'node:inspector';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
})
export class AcceuilComponent implements OnInit {
  check_login() {
    var myStorage = window.sessionStorage;
    for (var i = 0; i < myStorage.length; i++) {
      var a = myStorage.key(i);
      if (a != null) {
        var res = myStorage.getItem(a);
        if (res == 'true') {
          window.location.href = 'user';
          return 1;
        }
      }
    }
    window.location.href = 'login';
    return 0;
  }
  constructor() {}

  ngOnInit(): void {}
}
