import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es101Component } from './es101/es101.component';
import { Es102Component } from './es102/es102.component';
import { Es104Component } from './es104/es104.component';
import { Es105Component } from './es105/es105.component';
import { Es108Component } from './es108/es108.component';
import { Es109Component } from './es109/es109.component';
import { Es201Component } from './es201/es201.component';
import { Es202Component } from './es202/es202.component';
import { Es203Component } from './es203/es203.component';
import { Es204Component } from './es204/es204.component';

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
    path: '201',
    component: Es201Component,
  },
  {
    path: '202',
    component: Es202Component,
  },
  {
    path: '203',
    component: Es203Component,
  },
  {
    path: '204',
    component: Es204Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsercizioRoutes {}
