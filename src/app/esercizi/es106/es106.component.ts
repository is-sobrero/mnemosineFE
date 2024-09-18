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

export class Es106Component implements OnInit {

  cliccato = false;
  arraySequenza = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  arrayCliccato = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  buttonClicked: string[] = [];
  count = 0;
  errori = 0;
  nAccensioni = 0;
  nCliccati = 0;
  step = 1;
  i = 0;
  nameID: any;
  timer: any;
  seed = 'abracadabra';

  private http = inject(HttpClient);

  constructor() { }

  ngOnInit(): void {
  }

  resetVariabile() {
    this.arrayCliccato = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.nCliccati = 0;
    this.count = 0;
    this.errori = 0;
    clearInterval(this.timer);
  }

  setLivello(N: number) {
    this.nAccensioni = N;
    this.arraySequenza = this.shuffleArray(this.arraySequenza);
    console.log(this.arraySequenza);
    this.avvioSequenza();
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

  clickIncrease() {
    this.nCliccati++;

    if (this.nCliccati == this.nAccensioni) {
      this.stepIncrease();
    }
  }

  avvioSequenza() {
    let index = 0;
    this.timer = setInterval(() => {
      this.nameID = this.arraySequenza[index];
      console.log(this.nameID);
      index++;
      if (index == this.nAccensioni - 1) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  sequenzaSelezionata(valore: number) {
    this.buttonClicked[this.i] = valore.toString();
    this.i++;
  }

  crossCheck() {
    for (this.i = 0; this.i < this.nAccensioni; this.i++) {
      if (this.buttonClicked[this.i] != this.arraySequenza[this.i]) {
        this.errori++;
      }
    }
  }

}

