import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es101Component } from './es101/es101.component';
import { Es102Component } from './es102/es102.component';
import { Es401Component } from './es401/es401.component';
import { Es402Component } from './es402/es402.component';
import { Es403Component } from './es403/es403.component';
import { Es405Component } from './es405/es405.component';
import { Es410Component } from './es410/es410.component';


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
  },
  {
    path: "403",
    component: Es403Component,
  },
  {
    path: "405",
    component: Es405Component,
  },
  {
    path: "410",
    component: Es410Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsercizioRoutes { }