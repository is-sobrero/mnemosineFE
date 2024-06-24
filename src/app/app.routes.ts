import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Es101Component } from './esercizi/es101/es101.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'esercizio/101', component: Es101Component}
];
