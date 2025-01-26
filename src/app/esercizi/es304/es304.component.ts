import { Component, inject, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { ExerciseService } from '../../exercise.service';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-es304',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    NgFor,
    MatCardContent,
    MatButton,
  ],
  templateUrl: './es304.component.html',
  styleUrl: './es304.component.scss',
})
export class Es304Component implements OnInit {
  constructor(private ES: ExerciseService) {}
  private http = inject(HttpClient);

  livello: any;
  parola = '';
  wordlist = [];
  errori = 0;
  timeMillis = 0;

  assets: any[] = [
    {
      q: 'Girino',
      r: ['Rana', 'Cammello', 'Elefante', 'Leone', 'Zebra'],
      c: 'Rana',
    },
    {
      q: 'Matita',
      r: ['Libro', 'Astuccio', 'Righello', 'Diario', 'Penna'],
      c: 'Penna',
    },
    {
      q: 'Ocra',
      r: ['Giallo', 'Rosso', 'Verde', 'Arancione', 'Azzurro'],
      c: 'Rosso',
    },
  ];

  ngOnInit(): void {
    this.start();
  }

  start() {
    setInterval(() => {
      this.timeMillis += 1000;
    }, 1000);
    this.livello = this.ES.currentInfo().difficulty;
    if (this.livello == 1) {
      this.parola = this.assets[0].q;
      this.wordlist = this.assets[0].r;
    }
    if (this.livello == 2) {
      this.parola = this.assets[1].q;
      this.wordlist = this.assets[1].r;
    }
    if (this.livello == 3) {
      this.parola = this.assets[2].q;
      this.wordlist = this.assets[2].r;
    }
  }

  check(parola: string) {
    if (parola == this.assets[this.ES.currentInfo().difficulty - 1].c) {
      alert('Esercizio completato!');
      this.ES.nextExercise(304, { errors: this.errori, time: this.timeMillis });
    } else {
      this.errori++;
      console.log(this.errori);
    }
  }
}
