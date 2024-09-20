import { Component, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { __values } from 'tslib';

@Component({
  selector: 'app-es106',
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
    HttpClientModule,
  ],
  templateUrl: './es106.component.html',
  styleUrls: ['./es106.component.scss'],
})

export class Es106Component {
  cliccato = false;
  arraySequenza = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  arrayCliccato = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  arrayluci: string[] = [];
  buttonClicked: any[] = [];
  spenta = "off";
  accesa = "on";
  errori = 0;
  nAccensioni = 0;
  nCliccati = 0;
  step = 1;
  timer: any;
  seed = 'abracadabra';

  private http = inject(HttpClient);

  resetVariabile() {
    this.arrayCliccato = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.nCliccati = 0;
    this.errori = 0;
  }

  /**
   * Imposta il livello di difficolt  dell'esercizio, n  il numero di accensioni
   * della sequenza di luci da memorizzare.
   * @param N livello di difficoltà.
   */
  setLivello(N: number) {
    this.nAccensioni = N;
    this.arraySequenza = this.shuffleArray(this.arraySequenza);

    for (let i = 0; i < 9; i++) {
      this.arrayluci[i] = this.spenta;
    }
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  stepIncrease() {
    this.step++;

    if (this.step == 2) {
      this.avvioSequenza();
    }

    if (this.step == 4) {
      this.crossCheck();
    }
  }

  avvioSequenza() {
    let index = 0;
    this.timer = setInterval(() => {

      if(index < this.nAccensioni+ 1){
        for (let i = 0; i < 9; i++) {
          this.arrayluci[i] = this.spenta;
        }
  
        this.arrayluci[this.arraySequenza[index]] = this.accesa;
      }

      index++;

      if(index == this.nAccensioni + 1){
        clearInterval(this.timer);
        this.stepIncrease();
      }
    }, 1000);
  }

  sequenzaSelezionata(valore: number) {
    this.buttonClicked[this.nCliccati] = valore;
    this.nCliccati++;

    if (this.nCliccati == this.nAccensioni) {
      this.stepIncrease();
    }
  }

  crossCheck() {
    for (let i = 0; i < this.nAccensioni; i++) {
      if (this.buttonClicked[i] != this.arraySequenza[i]) {
        this.errori++;
      }
    }
  }
}