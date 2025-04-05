import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ExerciseService } from '../exercise.service';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../api.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    NgFor,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCardContent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private ES: ExerciseService, private api: ApiService) {}

  sessionPresent = true;
  sessions: any = [];
  userInfos: any;

  ngOnInit() {
    //get userInfos from localStorage
    //@ts-ignore
    this.userInfos = JSON.parse(localStorage.getItem('userInfos'));
    this.api.get('user/activeSessions').subscribe((res: any) => {
      this.sessions = res;
      if (res.length === 0) {
        this.sessionPresent = false;
      }
      console.log(res);
    });
  }

  startSession(sessionId: string) {
    this.ES.startSession(sessionId);
  }
}
