import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ExerciseService} from "../../exercise.service";

import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-es506',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatButton,
    MatInputModule,
    NgFor,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './es506.component.html',
  styleUrl: './es506.component.scss'
})
export class Es506Component implements OnInit {
  constructor(private ES: ExerciseService){}
  step = 1;
  disattivaImmagine: any = [0, 0, 0, 0, 0, 0];
  sequenzaImmagini: any = [];
  immagineCorrente: any;
  sequenzaFissa: any = [];
  sequenzaSelezionata: any = [];
  timer: any;
  livello = 1;
  errori = 0;
  erroriTotali = 0;
  timeMillis: any = 0;

  elementiLivello1 = [
    { id: 0, src: '../../assets/es506_images/lvl1/albero.png' },
    { id: 1, src: '../../assets/es506_images/lvl1/cane.png' },
    { id: 2, src: '../../assets/es506_images/lvl1/cipolla.png' },
    { id: 3, src: '../../assets/es506_images/lvl1/delfino.png' },
    { id: 4, src: '../../assets/es506_images/lvl1/gatto.png' },
    { id: 5, src: '../../assets/es506_images/lvl1/mela.png' },
  ]

  elementiLivello2 = [
    { id: 6, src: '../../assets/es506_images/lvl2/carota.png' },
    { id: 7, src: '../../assets/es506_images/lvl2/computer.png' },
    { id: 8, src: '../../assets/es506_images/lvl2/finestra.png' },
    { id: 9, src: '../../assets/es506_images/lvl2/orologio.png' },
    { id: 10, src: '../../assets/es506_images/lvl2/penna.png' },
    { id: 11, src: '../../assets/es506_images/lvl2/quercia.png' },
  ]

  elementiLivello3 = [
    { id: 12, src: '../../assets/es506_images/lvl3/avocado.png' },
    { id: 13, src: '../../assets/es506_images/lvl3/dragon-fruit.png' },
    { id: 14, src: '../../assets/es506_images/lvl3/mela.png' },
    { id: 15, src: '../../assets/es506_images/lvl3/melanzana.png' },
    { id: 16, src: '../../assets/es506_images/lvl3/melone.png' },
    { id: 17, src: '../../assets/es506_images/lvl3/pera.png' },
  ]

  ngOnInit() {
    this.iniziaGioco();
  }

  iniziaGioco() {
    this.creaSequenza();
    this.immagineCorrente = this.sequenzaImmagini[0];
    this.mostraSequenza();
  }

  resettaGioco() {
    this.step = 1;
    this.errori = 0;
    this.sequenzaImmagini = [];
    this.sequenzaSelezionata = [];
    this.sequenzaFissa = [];
    this.disattivaImmagine = [0, 0, 0, 0, 0, 0];
  }

  creaSequenza() {
    this.livello = this.ES.currentInfo().difficulty;
    switch (this.livello) {
      case 1:
        this.sequenzaImmagini = this.elementiLivello1;
        break;
      case 2:
        this.sequenzaImmagini = this.elementiLivello2;
        break;
      case 3:
        this.sequenzaImmagini = this.elementiLivello3;
        break;
    }
    this.sequenzaFissa = [...this.sequenzaImmagini];
    this.sequenzaImmagini = this.shuffleArray(this.sequenzaImmagini);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  mostraSequenza() {
    let contatore = 1;
    this.timer = setInterval(() => {
      if (contatore < this.sequenzaImmagini.length) {
        this.immagineCorrente = this.sequenzaImmagini[contatore];
        contatore++;
        console.log(this.immagineCorrente);
      } else {
        clearInterval(this.timer);
        this.nextStep();
      }
    }, 2000);
  }

  nextStep() {
    this.step += 1;

    if(this.step == 2){
      setInterval(() => {
        this.timeMillis += 100;
      }
      , 100);
    }

    if(this.step == 3)
      this.ES.nextExercise(506, { errors: this.errori, time: this.timeMillis });
  }

  nextLevel() {
    this.livello += 1;
    this.resettaGioco();
    this.iniziaGioco();
  }

  seleziona(id: number) {
    this.sequenzaSelezionata.push(id);

    if (this.sequenzaSelezionata.length == 6) {
      this.verificaErrori();
      this.nextStep();
    }
  }

  verificaErrori() {
    this.errori = 0;

    for (let i = 0; i < 6; i++) {
      if (this.sequenzaSelezionata[i] != this.sequenzaImmagini[i].id) {
        this.errori += 1;
      }
    }
  }
}