import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
  step = 1;
  problema: string = '';
  opzioni: number[] = [];
  corretta: number = 0;
  punteggio: number = 0;
  domandeTot: number = 5;
  risposte: number = 0;
  timeMillis: number = 0;
  timer: any;
  // seleziona il livello 0=facile, 1=medio, 2=difficile
  livello: number = 0;

  ngOnInit() {
    this.startTimer();
    this.CreaProblema();
  }

  startTimer() {
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
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
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
    const opzione = [this.corretta];
    while (opzione.length < 4) {
      // genera risposte sbagliate
      let rispostaSbagliata = this.corretta + (Math.floor(Math.random() * 10) - 5);
      if (!opzione.includes(rispostaSbagliata) && rispostaSbagliata >= 0) {
        opzione.push(rispostaSbagliata);
      }
    }
    // Shuffle
    this.opzioni = opzione.sort(() => Math.random() - 0.5);
  }

  controllaRisposta(selectedAnswer: number) {
    if (selectedAnswer === this.corretta) {
      this.punteggio++;
    }
    
    this.risposte++;
    
    if (this.risposte >= 5) {
      this.step = 2;
      clearInterval(this.timer);
    } else {
      this.CreaProblema();
    }
  }
}