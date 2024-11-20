import { Component, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es201',
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
  ],
  templateUrl: './es201.component.html',
  styleUrls: ['./es201.component.scss'],
})
export class Es201Component implements OnInit {
  livello = 1; // Livello di difficoltà (1, 2, o 3)
  step = 1; // Passo del gioco (1 o 2)
  griglia: string[][] = []; // Griglia di elementi
  target = '😄'; // Stimolo target
  larghezzaGriglia = 5; // Default per livello 1
  altezzaGriglia = 5; // Default per livello 1
  numeroTarget = 3; // Numero di target da trovare per livello 1
  targetTrovati = 0; // Contatore dei target trovati dall'utente
  timeMillis = 0; // Tempo trascorso dall'inizio del gioco
  errori = 0; // Numero di errori commessi dall'utente

  constructor(private ES: ExerciseService) {}

  ngOnInit(): void {
    this.iniziaGioco();
    setInterval(() => {
      this.timeMillis += 100;
    }, 100);
    this.livello = this.ES.currentInfo().difficulty;
  }

  // Inizia il gioco
  iniziaGioco() {
    this.targetTrovati = 0;
    this.configuraLivello();
    this.generaGriglia();
  }

  // Configura il livello
  configuraLivello() {
    switch (this.livello) {
      case 1:
        this.larghezzaGriglia = 5;
        this.altezzaGriglia = 5;
        this.numeroTarget = 3;
        break;
      case 2:
        this.larghezzaGriglia = 7;
        this.altezzaGriglia = 7;
        this.numeroTarget = 5;
        break;
      case 3:
        this.larghezzaGriglia = 10;
        this.altezzaGriglia = 10;
        this.numeroTarget = 10;
        break;
    }
  }

  // Genera la griglia
  generaGriglia() {
    this.griglia = [];
    let targetCount = 0;
    const elementi = [];

    for (let i = 0; i < this.altezzaGriglia * this.larghezzaGriglia; i++) {
      if (targetCount < this.numeroTarget) {
        elementi.push(this.target);
        targetCount++;
      } else {
        elementi.push('😆'); // Distrattore
      }
    }

    // Mescola la griglia
    this.shuffleArray(elementi);

    for (let i = 0; i < this.altezzaGriglia; i++) {
      const riga = elementi.slice(
        i * this.larghezzaGriglia,
        (i + 1) * this.larghezzaGriglia
      );
      this.griglia.push(riga);
    }
  }

  // Funzione per mescolare un array
  shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Gestisce il click su un elemento della griglia
  selezionaElemento(i: number, j: number) {
    if (this.griglia[i][j] === this.target) {
      this.griglia[i][j] = '✓'; // Segna come corretto
      this.targetTrovati++;
      this.verificaVittoria();
    } else {
      this.griglia[i][j] = '✗'; // Segna come errato
      this.errori++;
    }
  }

  // Verifica se l'utente ha vinto
  verificaVittoria() {
    if (this.targetTrovati >= this.numeroTarget) {
      //done
      this.ES.nextExercise(201, { time: this.timeMillis, errors: this.errori });
    }
  }

  nextStep() {
    this.step++;
    if(this.step == 3) {
      this.ES.nextExercise(201, {
        time: this.timeMillis,
        errors: this.errori,
      });
    }
  }

}
