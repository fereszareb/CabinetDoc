import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public fetchdata() {
    var lien = 'http://127.0.0.1:8000/dashboard/donnees-stat';
    fetch(lien)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40] },
    { data: [28, 48, 40, 19, 86, 27, 50] },
  ];

  public chartLabels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  public chartColors: Array<any> = [
    {
      backgroundColor: '#54D8FF20',
      borderColor: '#54D8FF',
      borderWidth: 1,
    },
    {
      backgroundColor: '#A7A7FF20',
      borderColor: '#A3A0FB',
      borderWidth: 1,
    },
  ];

  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  };
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}
  constructor() {}

  ngOnInit(): void {
    // chargement des donnes de stat

    fetch('http://127.0.0.1:8000/dashboard/donnees-stat')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.chartLabels = data.label;
        this.chartDatasets = [{ data: data.line1 }, { data: data.line2 }];
        var val = Object();
        var b = data;
        var id_stat = ['NTP', 'RDV-TDY', 'NP'];

        for (var i = 0; i < 3; i++) {
          val[i] = '<h3 class="m-0 fw-bold">' + b.cardstat[i].nb + '</h3>';
          if (b.cardstat[i].condition == '+') {
            val[i] +=
              '<small class="text-success"><i class="fas fa-long-arrow-alt-up"></i>' +
              b.cardstat[i].porcentage +
              '%</small>';
          } else if (b.cardstat[i].condition == '-') {
            val[i] +=
              '<small class="text-danger"><i class="fas fa-long-arrow-alt-down"></i>' +
              b.cardstat[i].porcentage +
              '%</small>';
          }
          var zone = document.getElementById(id_stat[i]);
          if (zone) {
            zone.innerHTML = val[i];
          }
        }
        //importer fichier chart

        // chargement du tableau de rendez vous aujourd'hui
        fetch('http://127.0.0.1:8000/dashboard/RDV-reste-today')
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);

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
            var zone = document.getElementById('RDV-TDY-T');
            if (zone) {
              zone.innerHTML = res;
            }
            // chargement du tableau de rendez-vous par mois
            fetch('http://127.0.0.1:8000/dashboard/patient-rdv-derniers-mois')
              .then((res) => res.json())
              .then((data) => {
                // console.log(data);
                var res1 = '';
                var tabjson1 = data;
                for (var i = 0; i < tabjson1.length; i++) {
                  res1 +=
                    '<tr><td>' +
                    tabjson1[i].mois +
                    '</td><td>' +
                    tabjson1[i].nbpat +
                    '</td><td>' +
                    tabjson1[i].nbconsulte +
                    '</td></tr>';
                }

                var zone = document.getElementById('RDVM');
                if (zone) {
                  zone.innerHTML = res1;
                }
              });
          });
      });
  }
}
