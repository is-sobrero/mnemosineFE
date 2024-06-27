import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'esercizio', loadChildren: () => import('./esercizi/esercizi.routes').then(m => m.EsercizioRoutes)}

];
