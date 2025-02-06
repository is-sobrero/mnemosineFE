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
import { ExerciseService } from '../../exercise.service';
@Component({
  selector: 'app-es104',
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
  ],
  templateUrl: './es104.component.html',
  styleUrls: ['./es104.component.scss'],
})
export class Es104Component implements OnInit {
  livello = 1; // Livello di difficoltà (1, 2, o 3)
  sequenzaLettere: string[] = []; // Sequenza di lettere da memorizzare
  inputUtente: string[] = []; // Sequenza di lettere inserita dall'utente
  step = 1; // Step del gioco (1: mostra sequenza, 2: inserimento, 3: risultato)
  errori = 0; // Numero di errori commessi
  timeMillis = 0; // Tempo impiegato dall'utente per completare il gioco

  lettere = 'ABCDEFGILMNOPQRSTUVZ'; // Lettere dell'alfabeto

  constructor(private ES: ExerciseService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.timeMillis += 100;
    }, 100);
    this.livello = this.ES.currentInfo().difficulty;
    this.iniziaGioco();
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
        ? 5
        : this.livello === 3
        ? 7
        : 3;
    this.sequenzaLettere = [];
    for (let i = 0; i < lunghezza; i++) {
      const letteraCasuale =
        this.lettere[Math.floor(Math.random() * this.lettere.length)];
      this.sequenzaLettere.push(letteraCasuale);
    }
  }

  // Avanza allo step successivo
  stepSuccessivo() {
    if (this.step === 2) {
      this.verificaRisposta();
    } else if (this.step === 3) {
      this.ES.nextExercise(104, { errors: this.errori, time: this.timeMillis });
    }
    this.step++;
  }

  // Aggiorna la risposta dell'utente
  aggiornaRisposta(indice: number, evento: Event) {
    const inputElement = evento.target as HTMLInputElement;
    this.inputUtente[indice] = inputElement.value.toUpperCase();
  }

  // Verifica la risposta dell'utente confrontandola con la sequenza corretta
  verificaRisposta() {
    this.errori = 0;
    for (let i = 0; i < this.sequenzaLettere.length; i++) {
      if (this.sequenzaLettere[i] !== this.inputUtente[i]) {
        this.errori++;
      }
    }
  }
}
