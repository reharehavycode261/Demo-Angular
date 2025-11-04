import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

export const appRoutes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'statistiques', component: StatistiquesComponent }, // Ajout de la route pour les statistiques
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];