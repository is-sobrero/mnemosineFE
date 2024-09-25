import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es502Component } from './es502/es502.component';


const routes: Routes = [
  { path: '', redirectTo: '/esercizi', pathMatch: 'full' },
  {
    path: '502',
    component: Es502Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsercizioRoutes { }
