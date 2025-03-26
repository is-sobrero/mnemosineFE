import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es305',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './es305.component.html',
  styleUrl: './es305.component.scss'
})
export class Es305Component {
  constructor(private ES: ExerciseService) { }

  problema: string = '';
  opzioni: number[] = [];
  corretta: number = 0;
  errori: number = 0;
  punteggio: number = 0;
  domandeTot: number = 5;
  risposte: number = 0;
  timeMillis: number = 0;
  timer: any;
  generando: boolean = false;
  // seleziona il livello 0=facile, 1=medio, 2=difficile
  livello: number = 0;

  ngOnInit() {
    this.punteggio = 0;
    this.risposte = 0;
    this.timeMillis = 0;
    this.generando = false;
    this.CreaProblema();
    this.livello=this.ES.currentInfo().difficulty-1;
    this.timer = setInterval(() => {
      this.timeMillis += 100;
    }, 100);
  }    

  CreaProblema() {
    let num1: number, num2: number, operazione: string;
    
    switch(this.livello) {
      case 0: // facile: somma e sottrazione con numeri da 1-20
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        operazione = Math.random() < 0.5 ? '+' : '-';
        break;
      case 1: // medio: moltiplicazione e divisione con numeri da 1-12
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        operazione = Math.random() < 0.5 ? '×' : '÷';
        if (operazione === '÷') {
          num1 = num1 * num2;
        }
        break;
      case 2: // difficile: tutte le operazioni con numeri più grandi
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        const operazioni = ['+', '-', '×'];
        operazione = operazioni[Math.floor(Math.random() * operazioni.length)];
        break;
      default:
        num1 = 0;
        num2 = 0;
        operazione = '+';
    }

    this.problema = `${num1} ${operazione} ${num2}`;
    
    switch(operazione) {
      case '+':
        this.corretta = num1 + num2;
        break;
      case '-':
        this.corretta = num1 - num2;
        break;
      case '×':
        this.corretta = num1 * num2;
        break;
      case '÷':
        this.corretta = num1 / num2;
        break;
    }

    this.generaOpzioni();
  }

  generaOpzioni() {
    const opzione: number[] = [this.corretta];
    let attempt = 0;
    const maxattempt = 100;
    
    while (opzione.length < 4 && attempt < maxattempt) {
      attempt++;
      const min = Math.max(0, this.corretta - 10);
      const max = this.corretta + 10;
      const range = max - min;
      
      let rispostaSbagliata = Math.floor(Math.random() * range) + min;
      
      // assicura che la risposta sbagliata sia diversa da quella vera
      if (rispostaSbagliata === this.corretta) {
        continue;
      }
      
      if (!opzione.includes(rispostaSbagliata)) {
        opzione.push(rispostaSbagliata);
      }
    }
      // se non riesce a generare risposte aggiunge numeri sequenziali
    while (opzione.length < 4) {
      const riempimento = this.corretta + opzione.length;
      if (!opzione.includes(riempimento)) {
        opzione.push(riempimento);
      }
    }

    // shuffle
    for (let i = opzione.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opzione[i], opzione[j]] = [opzione[j], opzione[i]];
    }
    
    this.opzioni = opzione;
  }

  async controllaRisposta(rispostaselezionata: number) {
    if (this.generando) return; // previene molteplici click
    
    try {
      this.generando = true;
      
      if (rispostaselezionata === this.corretta) {
        this.punteggio++;
      }
      else {
        this.errori++;
      }
      
      this.risposte++;
      
      if (this.risposte >= this.domandeTot) {
        this.ES.nextExercise(305, {errors: this.errori, time: this.timeMillis})
      } else {
        await new Promise(resolve => setTimeout(resolve, 100)); // ritardo per aggionare la UI
        this.CreaProblema();
      }
    } finally {
      this.generando = false;
    }
  }
}
