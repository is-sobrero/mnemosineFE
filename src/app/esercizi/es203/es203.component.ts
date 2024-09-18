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
import { error } from 'console';

@Component({
  selector: 'app-es203',
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
  templateUrl: './es203.component.html',
  styleUrl: './es203.component.scss',
})
export class Es203Component implements OnInit {
  livello = 0; // Livello di difficoltà (1, 2, o 3)
  punti: { x: number; y: number; label: string }[] = [];
  puntiUniti: string[] = [];
  messaggio = '';
  timeMillis = 0;
  errors = 0;

  constructor(private ES: ExerciseService) {}

  ngOnInit(): void {
    console.log('Livello:', this.ES.currentInfo());
    this.livello = this.ES.currentInfo().difficulty;
    setInterval(() => {
      this.timeMillis += 100;
    }, 100);
    this.generaPunti();
  }

  generaPunti() {
    this.punti = [];
    this.puntiUniti = [];
    this.messaggio = '';

    let numeroPunti;
    switch (this.livello) {
      case 1:
        numeroPunti = 5;
        break;
      case 2:
        numeroPunti = 10;
        break;
      case 3:
        numeroPunti = 15;
        break;
      default:
        numeroPunti = 5;
    }

    // Genera i punti in base al livello scelto
    for (let i = 1; i <= numeroPunti; i++) {
      const labelNum = i.toString(); // Converte il numero in stringa
      const labelAlpha = String.fromCharCode(64 + i); // Converte il numero in lettera (1 -> 'A', 2 -> 'B', ecc.)
      this.punti.push({
        x: Math.random() * 90, // Genera una posizione casuale su x
        y: Math.random() * 90, // Genera una posizione casuale su y
        label: labelNum, // Assegna il label numerico
      });
      this.punti.push({
        x: Math.random() * 90, // Genera una posizione casuale su x
        y: Math.random() * 90, // Genera una posizione casuale su y
        label: labelAlpha, // Assegna il label lettera
      });
    }

    // Ordina i punti alternando numeri e lettere
    this.punti.sort((a, b) => a.label.localeCompare(b.label));
  }

  // Verifica se il punto selezionato corrisponde al prossimo da unire
  selezionaPunto(punto: { x: number; y: number; label: string }) {
    const prossimoLabel = this.calcolaProssimoLabel();
    if (punto.label === prossimoLabel) {
      this.puntiUniti.push(punto.label); // Aggiunge il label alla lista dei punti uniti

      // Controlla se tutti i punti sono stati uniti
      if (this.puntiUniti.length === this.punti.length) {
        this.livello++;
        this.ES.nextExercise(203, {errors: this.errors, time: this.timeMillis});
      }
    } else {
      this.messaggio = `Hai selezionato ${punto.label} invece di ${prossimoLabel}. Riprova!`;
      this.errors++;
    }
  }

  // Calcola il prossimo label da unire
  /**
   * Calcola il prossimo label da unire.
   * Se non ci sono punti uniti, il prossimo label è '1'.
   * Se il prossimo label è un numero, lo converte in lettera.
   * Se il prossimo label è una lettera, lo converte in numero.
   *
   * @return {string} Il prossimo label da unire
   */
  calcolaProssimoLabel(): string {
    const ultimoLabel = this.puntiUniti[this.puntiUniti.length - 1];
    if (!ultimoLabel) {
      return '1'; // Se non ci sono punti uniti, il prossimo label è 1
    }
    if (!isNaN(Number(ultimoLabel))) {
      return String.fromCharCode(65 + Number(ultimoLabel) - 1); // Converte il numero in lettera
    } else {
      return (Number(ultimoLabel.charCodeAt(0) - 64) + 1).toString(); // Converte la lettera in numero
    }
  }
}
