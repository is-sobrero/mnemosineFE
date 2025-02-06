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
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es109',
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
    FormsModule,
  ],
  templateUrl: './es109.component.html',
  styleUrls: ['./es109.component.scss'],
})
export class Es109Component implements OnInit {
  livello = 1; // Livello di difficoltà (1, 2, o 3)
  sequenzaLettere: string[] = []; // Sequenza di lettere da memorizzare
  inputUtente: string[] = []; // Sequenza di lettere inseriti dall'utente
  step = 1; // Step del gioco (1: mostra sequenza, 2: inserimento, 3: risultato)
  errori = 0; // Numero di errori commessi
  timeMillis = 0; // Tempo trascorso in millisecondi

  lettere = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Lettere

  constructor(private ES: ExerciseService) {}

  ngOnInit(): void {
    this.iniziaGioco();
    this.timeMillis = 0;
    setInterval(() => {
      this.timeMillis += 100;
    }, 100);
    this.livello = this.ES.currentInfo().difficulty;
  }

  // Inizia il gioco
  iniziaGioco() {
    this.step = 1;
    this.errori = 0;
    this.inputUtente = [];
    this.generaSequenza();
  }

  // Genera una sequenza di lettere casuali in base al livello di difficoltà
  generaSequenza() {
    const lunghezza =
      this.livello === 1
        ? 3
        : this.livello === 2
        ? 4
        : this.livello === 3
        ? 6
        : 3;
    this.sequenzaLettere = [];
    for (let i = 0; i < lunghezza; i++) {
      const numeroCasuale =
        this.lettere[Math.floor(Math.random() * this.lettere.length)];
      this.sequenzaLettere.push(numeroCasuale);
    }
  }

  // Avanza allo step successivo
  stepSuccessivo() {
    if (this.step === 2) {
      this.verificaRisposta();
    } else if (this.step === 3) {
      this.ES.nextExercise(109, { errors: this.errori, time: this.timeMillis });
    }
    this.step++;
  }

  // Aggiorna la risposta dell'utente
  aggiornaRisposta(indice: number, evento: Event) {
    const inputElement = evento.target as HTMLInputElement;
    this.inputUtente[indice] = inputElement.value.toUpperCase();
  }

  // Verifica la risposta dell'utente confrontandola con la sequenza corretta (al contrario)
  verificaRisposta() {
    const sequenzaCorretta = [...this.sequenzaLettere].reverse();
    this.errori = 0;
    for (let i = 0; i < sequenzaCorretta.length; i++) {
      if (sequenzaCorretta[i] !== this.inputUtente[i]) {
        this.errori++;
      }
    }
  }
}
