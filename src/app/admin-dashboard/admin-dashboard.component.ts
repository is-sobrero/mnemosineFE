import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ApiService } from '../api.service';
import { MatButton } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatLabel,
    MatFormField,
    MatCardContent,
    MatSelect,
    MatOption,
    MatButton,
    NgFor
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  constructor(
    private api: ApiService
  ) { }

  users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  selectedUser = this.users[0];

  exersicesNumber = 11;

  esercizi = [
    { id: 103, difficulty: 1 }];

  assign() {
    console.log('Assigning...');
    console.log(this.selectedUser);
    console.log(this.esercizi);
    //create a session name based on the current date
    var sessionName = "del " + new Date().toLocaleDateString() + " alle " + new Date().toLocaleTimeString();
    this.api.post('addSession', { userId: 1, exercises: this.esercizi, sessionName: sessionName}).subscribe((res: any) => {
      console.log(res);
      if(res.message === 'Sessione salvata') {
        alert('Session assigned successfully');
      }
    });
  }

  addexe() {
    console.log('Adding...');
    this.exersicesNumber++;
    this.esercizi.push({ id: 103, difficulty: 1 });
  }

  remexe() {
    console.log('Removing...');
    this.exersicesNumber--;
    this.esercizi.pop();
  }

}
