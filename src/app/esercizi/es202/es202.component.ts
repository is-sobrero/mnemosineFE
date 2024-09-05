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
  selector: 'app-es202',
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
  templateUrl: './es202.component.html',
  styleUrls: ['./es202.component.scss'],
})
export class Es202Component implements OnInit {
  livello = 1;
  timeMillis = 0;
  errori = 0;
  punti: { x: number; y: number; numero: number }[] = [];
  puntiUniti: number[] = [];
  messaggio = '';

  constructor(private ES: ExerciseService) { }

  ngOnInit(): void {
    this.timeMillis = 0;
    this.errori = 0;

    this.generaPunti();

    setInterval(() => {
      this.timeMillis += 100;
    }
    , 100);
  }

  generaPunti() {
    this.punti = [];
    this.puntiUniti = [];
    this.messaggio = ''; // Vuoto di predefinito

    let numeroPunti;
    switch (this.livello) {
      case 1:
        numeroPunti = 10;
        break;
      case 2:
        numeroPunti = 15;
        break;
      case 3:
        numeroPunti = 25;
        break;
      default:
        numeroPunti = 10;
    }

    // Genera i punti e li piazza nella griglia
    for (let i = 1; i <= numeroPunti; i++) {
      // Crea un punto casuale con coordinate x e y compresi tra 0 e 90,
      // e gli assegna il numero corrispondente
      this.punti.push({
        x: Math.random() * 90, // Genera una coordinata x casuale compresa tra 0 e 90
        y: Math.random() * 90, // Genera una coordinata y casuale compresa tra 0 e 90
        numero: i, // Assegna il numero del punto
      });
    }
    // Ordina i punti per numero
    this.punti.sort((a, b) => a.numero - b.numero);
  }

  /**
   * Questa funzione viene chiamata quando l'utente seleziona un punto.
   * Verifica se il numero del punto selezionato corrisponde al prossimo numero da unire.
   * In caso affermativo, aggiunge il numero alla lista dei punti uniti.
   * Se tutti i punti sono stati uniti, viene mostrato un messaggio di conferma e
   * viene aumentato il livello o viene mostrato un messaggio di completamento.
   * In caso negativo, viene mostrato un messaggio di errore.
   *
   * @param punto l'oggetto che rappresenta il punto selezionato
   */
  selezionaPunto(punto: { x: number; y: number; numero: number }) {
    const prossimoNumero = this.puntiUniti.length + 1; // Calcola il prossimo numero da unire
    if (punto.numero === prossimoNumero) { // Verifica se il punto selezionato è il prossimo da unire
      this.puntiUniti.push(punto.numero); // Aggiunge il numero al gruppo di punti uniti

      // Controlla se tutti i punti sono stati uniti
      if (this.puntiUniti.length === this.punti.length) {
        alert('Hai completato il livello! Prossimo livello!'); // Mostra un messaggio di conferma
        if (this.livello < 3) {
          this.livello++; // Aumenta il livello
        } else {
          alert('Hai completato tutti i livelli!'); // Mostra un messaggio di completamento
          this.ES.nextExercise(202, {errors: this.errori, time: this.timeMillis});
        }
        this.generaPunti(); // Genera nuovamente i punti
      }
    } else {
      this.messaggio = `Hai selezionato il numero ${punto.numero} invece di ${prossimoNumero}. Riprova!`; // Mostra un messaggio di errore
      this.errori++;
    }
  }

  cambiaLivello(nuovoLivello: number) {
    this.livello = nuovoLivello;
    this.generaPunti();
  }
}
