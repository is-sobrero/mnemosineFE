import { Component } from '@angular/core';
import  { AssegnaEsercizioComponent } from '../admin/assegna-esercizio/assegna-esercizio.component';
import { SessionmanagerComponent } from '../admin/sessionmanager/sessionmanager.component';
import { AdminUserManagerComponent } from '../admin/admin-user-manager/admin-user-manager.component';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    AssegnaEsercizioComponent,
    SessionmanagerComponent,
    AdminUserManagerComponent
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  
}
