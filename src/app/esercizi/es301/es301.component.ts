import { Component, OnInit, inject } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es301',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatButton,
    NgFor,
    NgIf,
    MatInputModule,
    MatLabel,
    HttpClientModule,
  ],
  templateUrl: './es301.component.html',
  styleUrl: './es301.component.scss',
})
export class Es301Component implements OnInit {
  constructor(private ES: ExerciseService) {}
  //il set di variaibli + "l'iniezione" di HttpClient, che ci consente di scaricare il file txt
  seqNumeri: any[] = []; //questa roba è un array che va da 1 a numNumeri
  listaRisposte: any[] = [];
  step: number = 1;
  numList: any[] = [];
  errori: number = 0;
  numNumeri = 0;
  livello = 0;
  //TODO: implementare la seeded random
  seed = 'abracadabra';

  private http = inject(HttpClient);

  aggiornaRisposte(risposta: any, indice: any) {
    this.listaRisposte[indice - 1] = risposta.value;
    console.log(this.listaRisposte);
  }

  stepIncrease() {
    this.step++;
    // se step = 3, dobbiamo cross check
    if (this.step == 3) {
      var i = 0;
      while (i < 5) {
        var j = i + 1;
        while (j < 5) {
          if (this.listaRisposte[i] > this.listaRisposte[j]) {
            this.errori++;
          }
          j = j + 1;
        }
        i = i + 1;
      }

      this.ES.nextExercise(301, { errors: this.errori, time: this.timeMillis });
    }
  }

  timeMillis = 0;

  //funzione che viene eseguita all'avvio del componente
  ngOnInit(): void {
    this.step = 1;
    // ogni 100 millisecondi incrementa il tempo
    setInterval(() => {
      this.timeMillis += 100;
    }, 100);

    this.livello = this.ES.currentInfo().difficulty;

    switch (this.livello) {
      case 1:
        this.numNumeri = 3;
        break;

      case 2:
        this.numNumeri = 6;
        break;

      case 3:
        this.numNumeri = 9;
        break;
    }
    // faccio un ciclo for che cicla numNumeri volte, e pusha ogni volta un numero randomico tra 1 e 10, assicurandomi che non ci siano duplicati
    for (var i = 0; i < this.numNumeri; i++) {
      this.seqNumeri.push(i + 1);
      //ATTENZIONE!
      if (this.numNumeri > 10) {
        alert('Il numero di numeri deve essere minore di 10');
        break;
      }
      var random = Math.floor(Math.random() * 10);
      while (this.numList.includes(random)) {
        random = Math.floor(Math.random() * 10);
      }
      this.numList.push(random);
    }
  }
}
