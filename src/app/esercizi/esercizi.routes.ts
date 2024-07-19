import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es101Component } from './es101/es101.component';
import { Es102Component } from './es102/es102.component';
import { Es401Component } from './es401/es401.component';
import { Es402Component } from './es402/es402.component';

const routes: Routes = [
  {path: '', redirectTo: '/esercizi', pathMatch: 'full'},
  {
    path: '101',
    component: Es101Component,
  },
  {
    path: '102',
    component: Es102Component,
  },
  {
    path: "401",
    component: Es401Component,
  },
  {
    path: "402",
    component: Es402Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsercizioRoutes { }