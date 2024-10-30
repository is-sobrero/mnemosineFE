import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es504Component } from './es504/es504.component';


const routes: Routes = [
  { path: '', redirectTo: '/esercizi', pathMatch: 'full' },
  {
    path: '504',
    component: Es504Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsercizioRoutes {}
