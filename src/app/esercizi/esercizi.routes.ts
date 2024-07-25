import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es110Component } from './es110/es110.component';

const routes: Routes = [
  { path: '', redirectTo: '/esercizi', pathMatch: 'full' },
  {
    path: '110',
    component: Es110Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsercizioRoutes {}
