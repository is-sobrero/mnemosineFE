import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Es309Component } from './es309/es309.component';



const routes: Routes = [
  { path: '', redirectTo: '/esercizi', pathMatch: 'full' },
  {
    path: '309',
    component: Es309Component,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsercizioRoutes {}
