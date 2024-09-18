import { importProvidersFrom, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Es509Component } from './es509/es509.component';

const routes: Routes = [
  {path: '', redirectTo: '/esercizi', pathMatch: 'full'},
  {
    path: '509',
    component: Es509Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsercizioRoutes { }