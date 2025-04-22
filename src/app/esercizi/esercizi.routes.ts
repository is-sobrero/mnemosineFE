import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Es101Component } from './es101/es101.component';
import { Es402Component } from './es402/es402.component';
import { Es102Component } from './es102/es102.component';
import { Es103Component } from './es103/es103.component';
import { Es104Component } from './es104/es104.component';
import { Es105Component } from './es105/es105.component';
import { Es106Component } from './es106/es106.component';
import { Es108Component } from './es108/es108.component';
import { Es109Component } from './es109/es109.component';
import { Es201Component } from './es201/es201.component';
import { Es202Component } from './es202/es202.component';
import { Es203Component } from './es203/es203.component';
import { Es204Component } from './es204/es204.component';
import { Es205Component } from './es205/es205.component';
import { Es110Component } from './es110/es110.component';
import { Es301Component } from './es301/es301.component';
import { Es302Component } from './es302/es302.component';
import { Es303Component } from './es303/es303.component';
import { Es307Component } from './es307/es307.component';
import { Es308Component } from './es308/es308.component';
import { Es309Component } from './es309/es309.component';
import { Es401Component } from './es401/es401.component';
import { Es407Component } from './es407/es407.component';
import { Es408Component } from './es408/es408.component';
import { Es403Component } from './es403/es403.component';
import { Es405Component } from './es405/es405.component';
import { Es409Component } from './es409/es409.component';
import { Es410Component } from './es410/es410.component';
import { Es504Component } from './es504/es504.component';
import { Es505Component } from './es505/es505.component';
import { Es506Component } from './es506/es506.component';
import { Es304Component } from './es304/es304.component';
import { Es404Component } from './es404/es404.component';
import { Es208Component } from './es208/es208.component';
import { Es509Component } from './es509/es509.component';

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
    path: '106',
    component: Es106Component,
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
    path: '205',
    component: Es205Component,
  },
  {
    path: '110',
    component: Es109Component,
  },
  {
    path: '301',
    component: Es301Component,
  },
  {
    path: '302',
    component: Es302Component,
  },
  {
    path: '303',
    component: Es303Component,
  },
  {
    path: '307',
    component: Es307Component,
  },
  {
    path: '308',
    component: Es308Component,
  },
  {
    path: '309',
    component: Es309Component,
  },
  {
    path: '401',
    component: Es401Component,
  },
  {
    path: '407',
    component: Es407Component,
  },
  {
    path: '408',
    component: Es408Component,
  },
  {
    path: '409',
    component: Es409Component,
  },
  {
    path: '402',
    component: Es402Component,
  },
  {
    path: '403',
    component: Es403Component,
  },
  {
    path: '405',
    component: Es405Component,
  },
  {
    path: '410',
    component: Es410Component,
  },
  {
    path: '205',
    component: Es205Component,
  },
  {
    path: '504',
    component: Es504Component,
  },
  {
    path: '106',
    component: Es106Component,
  },
  {
    path: '304',
    component: Es304Component,
  },
  {
    path: '505',
    component: Es505Component,
  },
  {
    path: '404',
    component: Es404Component,
  },
  {
    path: '208',
    component: Es208Component,
  },
  {
    path: '506',
    component: Es506Component,
  },
  {
    path: '509',
    component: Es509Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsercizioRoutes {}
