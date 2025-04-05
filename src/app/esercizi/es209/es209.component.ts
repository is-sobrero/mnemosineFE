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
import { NgIf, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ExerciseService } from '../../exercise.service';
@Component({
  selector: 'app-es209',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatButton,
    NgIf,
    CommonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './es209.component.html',
  styleUrl: './es209.component.scss',
})
export class Es209Component implements OnInit {
  constructor(private ES: ExerciseService) {}
  livello = 0;
  sequenzaNumeri: string[] = []; // Sequenza di numeri da memorizzare
  inputUtente: number[] = []; // Sequenza di numeri inseriti dall'utente
  step = 1; // Step del gioco (1: mostra sequenza, 2: inserimento, 3: risultato)
  errori = 0; // Numero di errori commessi
  timeMillis = 0;
  expectedResult = 0;

  numeri = '1234567890'; // Numeri

  ngOnInit(): void {
    this.livello = this.ES.currentInfo().difficulty;
    this.iniziaGioco();

    setInterval(() => {
      this.timeMillis += 100;
    }, 100);
  }

  // Inizia il gioco
  iniziaGioco() {
    this.step = 1;
    this.errori = 0;
    this.timeMillis = 0;
    this.inputUtente = [];
    this.generaSequenza();
  }

  // Genera una sequenza di numeri casuali in base al livello di difficoltà
  generaSequenza() {
    const lunghezza =
      this.livello === 1
        ? 5
        : this.livello === 2
        ? 8
        : this.livello === 3
        ? 12
        : 3;
    this.sequenzaNumeri = [];
    for (let i = 0; i < lunghezza; i++) {
      var numeroCasuale: any =
        this.numeri[Math.floor(Math.random() * this.numeri.length)];
      //randomly multiply by -1 to make it negative, but keeping sum count positive
      if (
        Math.random() < 0.5 &&
        this.expectedResult - parseInt(numeroCasuale) >= 0
      ) {
        this.expectedResult -= parseInt(numeroCasuale);
        numeroCasuale = parseInt(numeroCasuale) * -1;
      } else {
        this.expectedResult += parseInt(numeroCasuale);
      }
      this.sequenzaNumeri.push(numeroCasuale);
    }
  }

  // Avanza allo step successivo
  stepSuccessivo() {
    if (this.step === 2) {
      this.verificaRisposta();
    }
    this.step++;
  }

  // Aggiorna la risposta dell'utente
  aggiornaRisposta(indice: number, evento: Event) {
    const inputElement = evento.target as HTMLInputElement;
    this.inputUtente[indice] = parseInt(inputElement.value, 10);
  }

  // Verifica la risposta dell'utente confrontandola con la sequenza corretta (al contrario)
  verificaRisposta() {
    const sequenzaCorretta = [...this.sequenzaNumeri].reverse();
    this.errori = 0;
    for (let i = 0; i < sequenzaCorretta.length; i++) {
      if (parseInt(sequenzaCorretta[i], 10) !== this.inputUtente[i]) {
        this.errori++;
      }
    }
    this.ES.nextExercise(108, { errors: this.errori, time: this.timeMillis });
  }
}
