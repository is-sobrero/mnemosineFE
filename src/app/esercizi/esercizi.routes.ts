import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es106Component } from './es106/es106.component';


const routes: Routes = [
  {path: '', redirectTo: '/esercizi', pathMatch: 'full'},
  {
    path: '106',
    component: Es106Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsercizioRoutes { }