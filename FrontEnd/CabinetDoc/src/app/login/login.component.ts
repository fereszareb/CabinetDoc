import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  check_login() {
    var mail = (<HTMLInputElement>document.getElementById('email')).value;
    var pass = (<HTMLInputElement>document.getElementById('pass')).value;
    fetch('http://127.0.0.1:8000/login-user', {
      method: 'POST',
      body: JSON.stringify({ email: mail, password: pass }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.verif == 0) {
          window.location.href = 'login';
        } else {
          var myStorage = window.sessionStorage;
          myStorage.setItem(data.id, 'true');
          window.location.href = 'user';
        }
      });
  }
  constructor() {}

  ngOnInit(): void {}
}
