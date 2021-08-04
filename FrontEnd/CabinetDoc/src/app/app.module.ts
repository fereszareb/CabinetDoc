import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './utilisateur/dashboard/dashboard.component';
import { PatientComponent } from './utilisateur/patient/patient.component';
import { RendezVousComponent } from './utilisateur/rendez-vous/rendez-vous.component';
import { PresentationComponent } from './utilisateur/presentation/presentation.component';
import { StatComponent } from './utilisateur/dashboard/stat/stat.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSummernoteModule } from 'ngx-summernote';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: 'user',
    component: UtilisateurComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { Title: 'Dashboard' },
      },
      {
        path: 'patient',
        component: PatientComponent,
        data: { Title: 'Patient' },
      },
      {
        path: 'rendez-vous',
        component: RendezVousComponent,
        data: { Title: 'Rendez-vous' },
      },
      {
        path: 'presentation',
        component: PresentationComponent,
        data: { Title: 'Presentation' },
      },
    ],
  },
  { path: 'login', component: LoginComponent, data: { Title: 'Se connecter' } },
  { path: '', component: AcceuilComponent, data: { Title: 'CabinetDoc' } },
];

@NgModule({
  declarations: [
    AppComponent,
    UtilisateurComponent,
    AcceuilComponent,
    DashboardComponent,
    PatientComponent,
    RendezVousComponent,
    PresentationComponent,
    StatComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    NgxSummernoteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
