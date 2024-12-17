import { Routes } from '@angular/router';
import { PickerComponent } from './picker/picker.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RisultatiComponent } from './risultati/risultati.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { authAdminGuard } from './auth-admin.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {path: 'esercizi', redirectTo: 'picker', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'admin/login', component: AdminLoginComponent},
    {path: 'picker', component: PickerComponent, canActivate: [AuthGuard] },
    {path: 'esercizio',canActivate: [AuthGuard] , loadChildren: () => import('./esercizi/esercizi.routes').then(m => m.EsercizioRoutes)},
    {path: 'risultati',canActivate: [AuthGuard] , component: RisultatiComponent},
    {path: 'dashboard',canActivate: [authAdminGuard] , component: AdminDashboardComponent}
];
