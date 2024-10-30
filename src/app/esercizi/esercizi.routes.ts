import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';





const routes: Routes = [
  { path: '', redirectTo: '/esercizi', pathMatch: 'full' },
  {
    path: '305',
    component: Es305Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsercizioRoutes {}
