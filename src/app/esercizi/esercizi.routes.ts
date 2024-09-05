import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es104Component } from './es104/es104.component';
import { Es208Component } from './es208/es208.component';
import { Es301Component } from './es301/es301.component';
import { Es302Component } from './es302/es302.component';
import { Es307Component } from './es307/es307.component';
import { Es308Component } from './es308/es308.component';

const routes: Routes = [
  {path: '', redirectTo: '/esercizi', pathMatch: 'full'},
  {
    path: '104',
    component: Es104Component,
  },
  {
    path: '208',
    component: Es208Component,
  },
  {
    path: '301',
    component: Es301Component,
  },
  {
    path: '302',
    component: Es302Component,
  },
  {
    path: '307',
    component: Es307Component,
  },
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