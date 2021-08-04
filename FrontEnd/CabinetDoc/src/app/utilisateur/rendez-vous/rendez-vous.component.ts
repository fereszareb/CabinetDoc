import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css'],
})
export class RendezVousComponent implements OnInit {
  htmlstr: string =
    '<button type="button" class="btn btn-danger" mdbBtn aria-label="Close" (click)="basicModal.hide()" mdbWavesEffect>Annuler</button>';
  remplir_table() {
    fetch('http://127.0.0.1:8000/rendez-vous')
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
            tabjson[i].temps +
            '</td></tr>';
        }
        var P = document.getElementById('RDV-T');
        if (P) {
          P.innerHTML = res;
        }
        //window.location.href = 'login';
      });
  }

  have_account() {
    var x =
      '<div class="mb-3"><label for="ident" class="form-label">Identifiant</label><input type="text" class="form-control" id="ident" aria-describedby="emailHelp"></div><div class="mb-3"><label for="date" class="form-label">Date</label><input type="date" class="form-control" id="date" aria-describedby="emailHelp"></div><div class="mb-3"><label for="time" class="form-label">temps</label><input type="time" class="form-control" id="time" aria-describedby="emailHelp"></div>';
    (<HTMLInputElement>(
      document.getElementById('content-add-RDV')
    )).innerHTML = x;
  }

  dont_have_account() {
    var x =
      '<div class="mb-3"><label for="nom" class="form-label">Nom</label><input type="text" class="form-control" id="nom" aria-describedby="emailHelp"></div> <div class="mb-3"><label for="prenom" class="form-label">Prenom</label><input type="text" class="form-control" id="prenom" aria-describedby="emailHelp"></div> <div class="mb-3"><label for="genre" class="form-label">Genre</label><input type="text" class="form-control" id="genre" aria-describedby="emailHelp"></div> <div class="mb-3"><label for="cin" class="form-label">CIN</label><input type="text" class="form-control" id="cin" aria-describedby="emailHelp"></div> <div class="mb-3"><label for="adr" class="form-label">Adresse</label><input type="text" class="form-control" id="adr" aria-describedby="emailHelp"></div> <div class="mb-3"><label for="tel" class="form-label">Tel</label><input type="text" class="form-control" id="tel" aria-describedby="emailHelp"></div>';
    (<HTMLInputElement>(
      document.getElementById('content-add-RDV')
    )).innerHTML = x;
  }

  public ajouter_rdv(): any {
    var id = (<HTMLInputElement>document.getElementById('ident')).value;
    var dt = (<HTMLInputElement>document.getElementById('date')).value;
    var tm = (<HTMLInputElement>document.getElementById('time')).value;
    fetch('http://127.0.0.1:8000/rendez-vous', {
      method: 'POST',
      body: JSON.stringify({ idp: id, date: dt, time: tm }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(JSON.stringify(data.message));
      });
  }

  ajouter_patient(): any {
    var nom = (<HTMLInputElement>document.getElementById('nom')).value;
    var prenom = (<HTMLInputElement>document.getElementById('prenom')).value;
    var cin = (<HTMLInputElement>document.getElementById('cin')).value;
    var genre = (<HTMLInputElement>document.getElementById('genre')).value;
    var adr = (<HTMLInputElement>document.getElementById('adr')).value;
    var tel = (<HTMLInputElement>document.getElementById('tel')).value;
    fetch('http://127.0.0.1:8000/patient', {
      method: 'POST',
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        genre: genre,
        cin: cin,
        adr: adr,
        tel: tel,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      });
  }

  constructor() {}

  ngOnInit(): void {
    this.remplir_table();
  }
}
