import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ExerciseService } from '../../exercise.service';

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
import { range } from 'rxjs';

interface PuzzleElement {
  id: any;
  src: string;
  active: boolean;
}

@Component({
  selector: 'app-es504',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatButton,
    MatInputModule,
    NgFor,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './es504.component.html',
  styleUrls: ['./es504.component.scss'], // Corretto da "styleUrl"
})
export class Es504Component implements OnInit {
  constructor(private ES: ExerciseService) { }
  step = 1;
  puzzle: PuzzleElement[] = []; // Array di riferimento per le immagini
  coveredImages: string = ''; // Immagine di copertura
  arrIndici: number[] = []; // Array contenente gli indici
  selezionabili: any = []; // Array contenente gli indici delle immagini selezionabili
  nCovered: number = 0; // Numero di immagini coperte
  nImages: number = 0; // Numero totale di immagini nel puzzle
  livello: number = 1;
  errori = 0;
  erroriTotali = 0;
  timeMillis: any = 0;
  timer: any = 0;

  elementiLivello1 = [
    { id: 1, src: '../../../assets/image_es504/lvl1/1.png', active: false },
    { id: 2, src: '../../../assets/image_es504/lvl1/2.png', active: false },
    { id: 3, src: '../../../assets/image_es504/lvl1/3.png', active: false },
    { id: 4, src: '../../../assets/image_es504/lvl1/4.png', active: false },
    { id: 5, src: '../../../assets/image_es504/lvl1/5.png', active: false },
    { id: 6, src: '../../../assets/image_es504/lvl1/6.png', active: false },
    { id: 7, src: '../../../assets/image_es504/lvl1/7.png', active: false },
    { id: 8, src: '../../../assets/image_es504/lvl1/8.png', active: false },
    { id: 9, src: '../../../assets/image_es504/lvl1/9.png', active: false },
    { id: 10, src: '../../../assets/image_es504/lvl1/10.png', active: false },
    { id: 11, src: '../../../assets/image_es504/lvl1/11.png', active: false },
    { id: 12, src: '../../../assets/image_es504/lvl1/12.png', active: false },
    { id: 13, src: '../../../assets/image_es504/lvl1/13.png', active: false },
    { id: 14, src: '../../../assets/image_es504/lvl1/14.png', active: false },
    { id: 15, src: '../../../assets/image_es504/lvl1/15.png', active: false },
    { id: 16, src: '../../../assets/image_es504/lvl1/16.png', active: false },
  ];

  elementiLivello2 = [
    { id: 1, src: '../../../assets/image_es504/lvl2/1.png', active: false },
    { id: 2, src: '../../../assets/image_es504/lvl2/2.png', active: false },
    { id: 3, src: '../../../assets/image_es504/lvl2/3.png', active: false },
    { id: 4, src: '../../../assets/image_es504/lvl2/4.png', active: false },
    { id: 5, src: '../../../assets/image_es504/lvl2/5.png', active: false },
    { id: 6, src: '../../../assets/image_es504/lvl2/6.png', active: false },
    { id: 7, src: '../../../assets/image_es504/lvl2/7.png', active: false },
    { id: 8, src: '../../../assets/image_es504/lvl2/8.png', active: false },
    { id: 9, src: '../../../assets/image_es504/lvl2/9.png', active: false },
    { id: 10, src: '../../../assets/image_es504/lvl2/10.png', active: false },
    { id: 11, src: '../../../assets/image_es504/lvl2/11.png', active: false },
    { id: 12, src: '../../../assets/image_es504/lvl2/12.png', active: false },
    { id: 13, src: '../../../assets/image_es504/lvl2/13.png', active: false },
    { id: 14, src: '../../../assets/image_es504/lvl2/14.png', active: false },
    { id: 15, src: '../../../assets/image_es504/lvl2/15.png', active: false },
    { id: 16, src: '../../../assets/image_es504/lvl2/16.png', active: false },
    { id: 17, src: '../../../assets/image_es504/lvl2/17.png', active: false },
    { id: 18, src: '../../../assets/image_es504/lvl2/18.png', active: false },
    { id: 19, src: '../../../assets/image_es504/lvl2/19.png', active: false },
    { id: 20, src: '../../../assets/image_es504/lvl2/20.png', active: false },
    { id: 21, src: '../../../assets/image_es504/lvl2/21.png', active: false },
    { id: 22, src: '../../../assets/image_es504/lvl2/22.png', active: false },
    { id: 23, src: '../../../assets/image_es504/lvl2/23.png', active: false },
    { id: 24, src: '../../../assets/image_es504/lvl2/24.png', active: false },
    { id: 25, src: '../../../assets/image_es504/lvl2/25.png', active: false },
  ];

  elementiLivello3 = [
    { id: 1, src: '../../../assets/image_es504/lvl3/1.png', active: false },
    { id: 2, src: '../../../assets/image_es504/lvl3/2.png', active: false },
    { id: 3, src: '../../../assets/image_es504/lvl3/3.png', active: false },
    { id: 4, src: '../../../assets/image_es504/lvl3/4.png', active: false },
    { id: 5, src: '../../../assets/image_es504/lvl3/5.png', active: false },
    { id: 6, src: '../../../assets/image_es504/lvl3/6.png', active: false },
    { id: 7, src: '../../../assets/image_es504/lvl3/7.png', active: false },
    { id: 8, src: '../../../assets/image_es504/lvl3/8.png', active: false },
    { id: 9, src: '../../../assets/image_es504/lvl3/9.png', active: false },
    { id: 10, src: '../../../assets/image_es504/lvl3/10.png', active: false },
    { id: 11, src: '../../../assets/image_es504/lvl3/11.png', active: false },
    { id: 12, src: '../../../assets/image_es504/lvl3/12.png', active: false },
    { id: 13, src: '../../../assets/image_es504/lvl3/13.png', active: false },
    { id: 14, src: '../../../assets/image_es504/lvl3/14.png', active: false },
    { id: 15, src: '../../../assets/image_es504/lvl3/15.png', active: false },
    { id: 16, src: '../../../assets/image_es504/lvl3/16.png', active: false },
    { id: 17, src: '../../../assets/image_es504/lvl3/17.png', active: false },
    { id: 18, src: '../../../assets/image_es504/lvl3/18.png', active: false },
    { id: 19, src: '../../../assets/image_es504/lvl3/19.png', active: false },
    { id: 20, src: '../../../assets/image_es504/lvl3/20.png', active: false },
    { id: 21, src: '../../../assets/image_es504/lvl3/21.png', active: false },
    { id: 22, src: '../../../assets/image_es504/lvl3/22.png', active: false },
    { id: 23, src: '../../../assets/image_es504/lvl3/23.png', active: false },
    { id: 24, src: '../../../assets/image_es504/lvl3/24.png', active: false },
    { id: 25, src: '../../../assets/image_es504/lvl3/25.png', active: false },
    { id: 26, src: '../../../assets/image_es504/lvl3/26.png', active: false },
    { id: 27, src: '../../../assets/image_es504/lvl3/27.png', active: false },
    { id: 28, src: '../../../assets/image_es504/lvl3/28.png', active: false },
    { id: 29, src: '../../../assets/image_es504/lvl3/29.png', active: false },
    { id: 30, src: '../../../assets/image_es504/lvl3/30.png', active: false },
    { id: 31, src: '../../../assets/image_es504/lvl3/31.png', active: false },
    { id: 32, src: '../../../assets/image_es504/lvl3/32.png', active: false },
    { id: 33, src: '../../../assets/image_es504/lvl3/33.png', active: false },
    { id: 34, src: '../../../assets/image_es504/lvl3/34.png', active: false },
    { id: 35, src: '../../../assets/image_es504/lvl3/35.png', active: false },
    { id: 36, src: '../../../assets/image_es504/lvl3/36.png', active: false },
  ];
  nColonne!: number;

  ngOnInit() {
    this.livello = this.ES.currentInfo().difficulty-1;

    setInterval(() => {
      this.timeMillis += 100;
    }
    , 100);

    switch (this.livello) {
      case 1:
        this.puzzle = JSON.parse(JSON.stringify(this.elementiLivello1));
        this.nImages = 16;
        this.nCovered = 4;
        this.nColonne = 4;
        this.coveredImages =
          '../../../assets/image_es504/coveredImages/lvl1.png';
        console.log(this.elementiLivello1);
        break;

      case 2:
        this.puzzle = JSON.parse(JSON.stringify(this.elementiLivello2));
        this.nImages = 25;
        this.nCovered = 6;
        this.nColonne = 5;
        this.coveredImages =
          '../../../assets/image_es504/coveredImages/lvl2.png';
        console.log(this.elementiLivello2);
        break;

      case 3:
        this.puzzle = JSON.parse(JSON.stringify(this.elementiLivello3));
        this.nImages = 36;
        this.nCovered = 8;
        this.nColonne = 6;
        this.coveredImages =
          '../../../assets/image_es504/coveredImages/lvl3.png';
        console.log(this.elementiLivello3);
        break;

      default:
        console.error('Livello non valido');
  }

    // Genera array di indici e mischialo
    this.arrIndici = Array.from({ length: this.nImages }, (_, i) => i);
    this.shuffleArray(this.arrIndici);

    // Prendi solo i primi nCovered indici
    const coveredIndices = this.arrIndici.slice(0, this.nCovered);

    // Copri le immagini corrispondenti agli indici
    coveredIndices.forEach((index) => {
      if (this.puzzle.length == 16) {
        this.selezionabili.push(this.elementiLivello1[index]);
      } else if (this.puzzle.length == 25) {
        this.selezionabili.push(this.elementiLivello2[index]);
      } else if (this.puzzle.length == 36) {
        this.selezionabili.push(this.elementiLivello3[index]);
      }
      this.puzzle[index].active = true;
      this.puzzle[index].src = this.coveredImages;
    });

    console.log(this.puzzle);
    console.log(this.selezionabili);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  selezionaCelle(index: number): void {
    // Controlla se la cella è selezionabile
    if (!this.puzzle[index].active) {
      console.error("Cella non selezionabile!");
      return;
    }

    console.log("Cella selezionata:", index);
  
    // Recupera l'indice corretto della prossima cella da selezionare
    const indexCorretto = this.arrIndici[this.nCovered - this.selezionabili.length];
 
    console.log("Indice corretto:", indexCorretto);
    
    // Verifica se l'indice selezionato è corretto
    if (this.puzzle[index].id === this.selezionabili[0].id) {
      this.puzzle[index].active = false; // Disattiva la cella selezionata
      this.puzzle[index].src = this.selezionabili[0].src; // Mostra l'immagine corretta
      this.selezionabili.shift(); // Rimuovi la cella dai selezionabili

      console.log("Cella corretta selezionata!");
  
      // Passa allo step successivo se tutte le selezioni sono completate
      if (this.selezionabili.length === 0) {
        this.timer = this.timeMillis;
        this.step++;
        this.erroriTotali += this.errori; // Aggiungi gli errori al totale
        this.errori = 0; // Resetta gli errori per il prossimo livello
      }
    } else {
      this.errori++; // Incrementa il contatore degli errori
      alert("Errore! Hai selezionato l'indice sbagliato.");
    }
    
    if(this.step == 2)
      this.ES.nextExercise(504, {errors: this.erroriTotali, time: this.timeMillis});
  }
  
}
