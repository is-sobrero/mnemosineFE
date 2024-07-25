import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Es308Component } from './es308/es308.component';

const routes: Routes = [
  {path: '', redirectTo: '/esercizi', pathMatch: 'full'},
  {
    path: '308',
    component: Es308Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsercizioRoutes { }