import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es303Component } from './es303/es303.component';



const routes: Routes = [
  {path: '', redirectTo: '/esercizi', pathMatch: 'full'},
  {
    path: '303',
    component: Es303Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsercizioRoutes { }