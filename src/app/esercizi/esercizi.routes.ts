import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es101Component } from './es101/es101.component';
import { Es102Component } from './es102/es102.component';


const routes: Routes = [
  {
    path: '101',
    component: Es101Component,
  },
  {
    path: '102',
    component: Es102Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsercizioRoutes { }