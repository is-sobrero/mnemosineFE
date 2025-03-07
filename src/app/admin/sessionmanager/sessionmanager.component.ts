import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ApiService } from '../../api.service';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatRow, MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-sessionmanager',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIconModule,
    MatExpansionModule, 
    MatLabel,
    MatFormField,
    MatTableModule,
    MatCardContent,
    MatSelect,
    MatRow,
    MatOption,
    MatButton,
    NgFor,
    NgIf
  ],
  templateUrl: './sessionmanager.component.html',
  styleUrl: './sessionmanager.component.scss'
})
export class SessionmanagerComponent implements OnInit {
  constructor(
    private api: ApiService
  ) { }

  sessions:any = [];
  displayedColumns: string[] = ['number', 'esercizio', 'errori', 'tempo'];
  ngOnInit(): void {
    this.api.get('admin/getSessions').subscribe((res: any) => {
      this.sessions = res;
    });
    //every 1s refresh
    setInterval(() => {
      this.refresh();
    }, 1000);
  }
  refresh() {
    this.api.get('admin/getSessions').subscribe((res: any) => {
    console.log(res);
      if (res.length != this.sessions.length) {
        this.sessions = res;
      }
    });
  }

  
}
