import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es205Component } from './es205/es205.component';


const routes: Routes = [
  { path: '', redirectTo: '/esercizi', pathMatch: 'full' },
  {
    path: '205',
    component: Es205Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsercizioRoutes {}
