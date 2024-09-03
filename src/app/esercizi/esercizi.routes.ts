import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es103Component } from './es103/es103.component';
import { Es104Component } from './es104/es104.component';
import { Es105Component } from './es105/es105.component';
import { Es108Component } from './es108/es108.component';
import { Es109Component } from './es109/es109.component';
import { Es110Component } from './es110/es110.component';
import { Es303Component } from './es303/es303.component';
import { Es401Component } from './es401/es401.component';
import { Es402Component } from './es402/es402.component';
import { Es403Component } from './es403/es403.component';

const routes: Routes = [
  { path: '', redirectTo: '/esercizi', pathMatch: 'full' },
  {
    path: '110',
    component: Es110Component,
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
  {
    path: '108',
    component: Es108Component,
  },
  {
    path: '109',
    component: Es109Component,
  },
  {
   path: '110',
   component: Es109Component,
  },
  {
    path: '303',
    component: Es303Component,
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsercizioRoutes {}

