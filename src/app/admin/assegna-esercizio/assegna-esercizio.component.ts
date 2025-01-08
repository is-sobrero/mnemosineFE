import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ApiService } from '../../api.service';
import { MatButton } from '@angular/material/button';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-assegna-esercizio',
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
  templateUrl: './assegna-esercizio.component.html',
  styleUrl: './assegna-esercizio.component.scss'
})
export class AssegnaEsercizioComponent implements OnInit {

    constructor(
      private api: ApiService
    ) { }


    users: any = [];

    ngOnInit(): void {
      this.api.get('admin/getUsers').subscribe((res: any) => {
        this.users = res;
      });
    }
  

  
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
      this.api.post('admin/addSession', { userId: 1, exercises: this.esercizi, sessionName: sessionName, assignedTo: this.selectedUser}).subscribe((res: any) => {
        console.log(res);
        if(res.message === 'Session added successfully') {
          alert('Sessione salvata e inviata!');
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

