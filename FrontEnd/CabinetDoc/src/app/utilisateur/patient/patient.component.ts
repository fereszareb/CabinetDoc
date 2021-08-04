import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  remplir_table(a: string) {
    fetch('http://127.0.0.1:8000/patient' + a)
      .then((res) => res.json())
      .then((data) => {
        var res = '';
        var tabjson = data;
        for (var i = 0; i < tabjson.length; i++) {
          res +=
            '<tr><td>' +
            tabjson[i].nom +
            '</td><td>' +
            tabjson[i].prenom +
            '</td><td>' +
            tabjson[i].nbconsulte +
            '</td><td>' +
            tabjson[i].genre +
            '</td><td>' +
            tabjson[i].inscri +
            '</td></tr>';
        }
        var P = document.getElementById('P');
        if (P) {
          P.innerHTML = res;
        }
        //window.location.href = 'login';
      });
  }
  chercher_patient() {
    var nom = (<HTMLInputElement>document.getElementById('nom')).value;
    var prenom = (<HTMLInputElement>document.getElementById('prenom')).value;
    var cin = (<HTMLInputElement>document.getElementById('cin')).value;
    var k = '';
    var ch = [];
    if (cin.length != 0 || nom.length != 0 || prenom.length != 0) {
      k += '?';
      if (cin.length != 0) {
        ch.push('cin=' + cin);
      }
      if (nom.length != 0) {
        ch.push('nom=' + nom);
      }
      if (prenom.length != 0) {
        ch.push('prenom=' + prenom);
      }
      k += ch.join('&');
    }
    this.remplir_table(k);
  }
  constructor() {}

  ngOnInit(): void {
    // chargement du tableau de patient
    this.remplir_table('');
  }
}
