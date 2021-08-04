import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css'],
})
export class UtilisateurComponent implements OnInit {
  titleService: any;
  deconnecter() {
    var myStorage = window.sessionStorage;
    myStorage.clear();
  }
  constructor() {}

  btn_slidebar() {
    var slidebar = document.getElementById('slidebar');
    var btn = document.getElementById('content');
    if (slidebar != null && btn != null) {
      console.log('ff');
      if (slidebar.className === 'sidebar hidden-slidebar') {
        slidebar.className = 'sidebar';
        btn.className = 'content centre';
      } else {
        slidebar.className = 'sidebar hidden-slidebar';
        btn.className = 'content centre click';
      }
    }
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    var x = screen.width;
    if (x < 985) {
      var slidebar = document.getElementById('slidebar');
      var btn = document.getElementById('content');
      if (slidebar != null && btn != null) {
        console.log('ff');
        slidebar.className += ' hidden-slidebar';
        btn.className += ' click';
      }
    }
  }
}
