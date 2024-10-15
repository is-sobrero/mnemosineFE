import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es205',
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
        CommonModule,
        MatInputModule,
        FormsModule
  ],
  templateUrl: './es205.component.html',
  styleUrl: './es205.component.scss'
})
export class Es205Component {
  livello = 0;
    immagineSinistra: string = '';
    immagineDestra: string = '';
    step = 0;
    errori: number = 0;
    timeMillis: number = 0;
    differenzeTrovate: number = 0;
    totaleDifferenze: number = 0;

    // Array di oggetti immagine per i tre livelli
    immagini = [
        {
            sinistra: 'assets/images_es205/zebra_sinistra.jpg',
            destra: 'assets/images_es205/zebra_destra.jpg',
            differenze: 3
        },
        {
            sinistra: 'assets/images_es205/albero_sinistra.jpg',
            destra: 'assets/images_es205/albero_destra.jpg',
            differenze: 5
        },
        {
            sinistra: 'assets/images_es205/albero_sinistra.jpg',
            destra: 'assets/images_es205/albero_destra.jpg',
            differenze: 7
        },
       
    ];

    constructor() { }

    ngOnInit(): void {
        setInterval(() => {
            this.timeMillis += 100;
        }, 100);
    }

    selezionaLivello(livello: number) {
        this.livello = livello;
        this.iniziaGioco();
    }

    iniziaGioco() {
        this.step = 1;
        this.differenzeTrovate = 0;
        this.totaleDifferenze = this.immagini[this.livello].differenze;
        this.immagineSinistra = this.immagini[this.livello].sinistra;
        this.immagineDestra = this.immagini[this.livello].destra;
    }

    checkDifferenze() {
        // Per semplificare, qui simuliamo la verifica delle differenze
        if (this.differenzeTrovate === this.totaleDifferenze) {
            this.step = 2; // Fine del gioco
        } else {
            alert('Non hai ancora trovato tutte le differenze!');
        }
    }
    contaErrori(){
        this.errori+=1;
        alert(this.errori);
    }
   
}


