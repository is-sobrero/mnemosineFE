import { Component } from '@angular/core';
import  { AssegnaEsercizioComponent } from '../admin/assegna-esercizio/assegna-esercizio.component';
import { SessionmanagerComponent } from '../admin/sessionmanager/sessionmanager.component';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    AssegnaEsercizioComponent,
    SessionmanagerComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  
}
