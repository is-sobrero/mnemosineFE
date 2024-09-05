import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Es103Component } from './es103/es103.component';
import { Es104Component } from './es104/es104.component';
import { Es105Component } from './es105/es105.component';
import { Es108Component } from './es108/es108.component';
import { Es109Component } from './es109/es109.component';
import { Es201Component } from './es201/es201.component';
import { Es202Component } from './es202/es202.component';
import { Es203Component } from './es203/es203.component';
import { Es204Component } from './es204/es204.component';
import { Es110Component } from './es110/es110.component';
import { Es303Component } from './es303/es303.component';
import { Es401Component } from './es401/es401.component';
import { Es407Component } from './es407/es407.component';
import { Es408Component } from './es408/es408.component';
import { Es402Component } from './es402/es402.component';
import { Es403Component } from './es403/es403.component';
import { Es405Component } from './es405/es405.component';
import { Es410Component } from './es410/es410.component';
import { Es501Component } from './es501/es501.component';

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
    path: "407",
    component: Es407Component,
  },
  {
    path: "408",
    component: Es408Component,
  },
  {
    path: "402",
    component: Es402Component,
  },
  {
    path: "403",
    component: Es403Component,
  },
  {
    path: "405",
    component: Es405Component,
  },
  {
    path: "410",
    component: Es410Component,
  },
  {
    path: "501",
    component: Es501Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsercizioRoutes {}
