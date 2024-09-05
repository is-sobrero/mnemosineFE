import { Routes } from '@angular/router';
import { PickerComponent } from './picker/picker.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RisultatiComponent } from './risultati/risultati.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'esercizi', redirectTo: 'picker', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'picker', component: PickerComponent},
    {path: 'esercizio', loadChildren: () => import('./esercizi/esercizi.routes').then(m => m.EsercizioRoutes)},
    {path: 'risultati', component: RisultatiComponent}
];
