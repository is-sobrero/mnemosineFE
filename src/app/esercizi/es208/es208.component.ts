import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es208',
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
    MatInputModule,
    MatLabel,
    NgClass,
  ],
  templateUrl: './es208.component.html',
  styleUrl: './es208.component.scss',
})
export class Es208Component {
  numList: number[] = []; // Numeri casuali
  colorList: string[] = []; // Collettore di colori (blu o rosso)
  risultato: number = 0; // Risultato finale
  step: number = 1;
  timeMillis: number = 0;
  risultatoVerificato: boolean | null = null; // Per verificare se il risultato dell'utente è corretto
  errori: number = 0;

  constructor(private ES: ExerciseService) {}

  diff = this.ES.currentInfo().difficulty;
  numNumeri: number = this.diff === 1 ? 3 : this.diff === 2 ? 5 : 7; // Numero di numeri da generare

  // Incremento dello step
  stepIncrease() {
    this.step++;
    if (this.step === 2) {
      this.calcolaRisultato(); // Calcola il risultato quando si passa al secondo step
    }
  }

  // Funzione che calcola il risultato finale
  calcolaRisultato() {
    let tempRisultato = 0;
    for (let i = 0; i < this.numNumeri; i++) {
      const num = this.numList[i];
      if (this.colorList[i] === 'color-blue') {
        tempRisultato += num; // Somma se il numero è blu
      } else {
        tempRisultato -= num; // Sottrai se il numero è rosso
      }
    }
    this.risultato = tempRisultato; // Assegno il risultato finale
  }

  // Verifica il risultato inserito dall'utente
  verificaRisultato(risultatoUtente: string) {
    const utenteRisultato = Number(risultatoUtente);
    if (utenteRisultato === this.risultato) {
      this.risultatoVerificato = true; // Risultato corretto
      this.ES.nextExercise(208, { errors: this.errori, time: this.timeMillis });
    } else {
      this.risultatoVerificato = false; // Risultato errato
      this.errori++;
    }
  }

  ngOnInit(): void {
    // Inizializzazione
    setInterval(() => {
      this.timeMillis += 100;
    }, 100);

    for (let i = 0; i < this.numNumeri; i++) {
      let random = Math.floor(Math.random() * 10) + 1;
      while (this.numList.includes(random)) {
        random = Math.floor(Math.random() * 10) + 1;
      }
      this.numList.push(random);

      const colore = Math.floor(Math.random() * 2); // 0 o 1
      if (colore === 0) {
        this.colorList.push('color-blue'); // Blu
      } else {
        this.colorList.push('color-red'); // Rosso
      }
    }
  }
}
