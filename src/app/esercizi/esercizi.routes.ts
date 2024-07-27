import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es101Component } from './es101/es101.component';
import { Es102Component } from './es102/es102.component';
import { Es103Component } from './es103/es103.component';
import { Es104Component } from './es104/es104.component';
import { Es105Component } from './es105/es105.component';

const routes: Routes = [
  { path: '', redirectTo: '/esercizi', pathMatch: 'full' },
  {
    path: '101',
    component: Es101Component,
  },
  {
    path: '102',
    component: Es102Component,
  },
  {
    path: '103',
    component: Es103Component,
  },
  {
    path: '104',
    component: Es104Component,
  },
  {
    path: '105',
    component: Es105Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsercizioRoutes { }
