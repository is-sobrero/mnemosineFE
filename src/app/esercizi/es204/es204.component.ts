import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardTitle } from '@angular/material/card';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es204',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardTitle, NgFor, NgIf, CommonModule],
  templateUrl: './es204.component.html',
  styleUrls: ['./es204.component.scss'],
})
export class Es204Component implements OnInit {
  livelloCorrente = 0; // Variabile che tiene traccia del livello selezionato
  timeMillis = 0;
  errori = 0;

  constructor(private ES: ExerciseService) {}

  // Liste di elementi per ciascun livello
  elementiLivelloUno = [
    { nome: 'e11', src: 'assets/images_es204/pencil.png', eBersaglio: false },
    { nome: 'e12', src: 'assets/images_es204/pen.png', eBersaglio: false },
    { nome: 'e13', src: 'assets/images_es204/eraser.png', eBersaglio: false },
  ];

  elementiLivelloDue = [
    { nome: 'e21', src: 'assets/images_es204/book.png', eBersaglio: false },
    { nome: 'e22', src: 'assets/images_es204/book1.png', eBersaglio: false },
    { nome: 'e23', src: 'assets/images_es204/book2.png', eBersaglio: false },
    { nome: 'e24', src: 'assets/images_es204/book3.png', eBersaglio: false },
  ];

  elementiLivelloTre = [
    { nome: 'e31', src: 'assets/images_es204/ball.png', eBersaglio: false },
    { nome: 'e32', src: 'assets/images_es204/ball1.png', eBersaglio: false },
    { nome: 'e33', src: 'assets/images_es204/ball2.png', eBersaglio: false },
    { nome: 'e34', src: 'assets/images_es204/ball3.png', eBersaglio: false },
    { nome: 'e35', src: 'assets/images_es204/ball4.png', eBersaglio: false },
    { nome: 'e36', src: 'assets/images_es204/ball5.png', eBersaglio: false },
  ];

  // Variabili per memorizzare i bersagli casuali per ogni livello
  targetLivelloUno: any;
  targetLivelloDue: any;
  targetLivelloTre: any;

  ngOnInit() {
    this.errori = 0;
    this.timeMillis = 0;
    this.livelloCorrente = this.ES.currentInfo().difficulty;

    this.targetLivelloUno = this.selezionaBersaglioCasuale(
      this.elementiLivelloUno,
    );
    this.targetLivelloDue = this.selezionaBersaglioCasuale(
      this.elementiLivelloDue,
    );
    this.targetLivelloTre = this.selezionaBersaglioCasuale(
      this.elementiLivelloTre,
    );

    setInterval(() => {
      this.timeMillis += 100;
    }, 100);
  }

  // Metodo per selezionare il livello
  selezionaLivello(livello: number) {
    this.livelloCorrente = livello;
  }

  // Metodo per selezionare un bersaglio casuale dalla lista degli elementi
  selezionaBersaglioCasuale(elementi: any[]): any {
    const indiceCasuale = Math.floor(Math.random() * elementi.length);
    elementi[indiceCasuale].eBersaglio = true;
    return elementi[indiceCasuale];
  }

  // Metodo per controllare se l'elemento cliccato è il bersaglio
  controllaBersaglio(elemento: {
    nome: string;
    src: string;
    eBersaglio: boolean;
  }) {
    if (elemento.eBersaglio) {
      alert('Hai trovato il bersaglio!');
      this.ES.nextExercise(204, { errors: this.errori, time: this.timeMillis });
    } else {
      alert('Questo non è il bersaglio. Riprova!');
      this.errori++;
    }
  }
}
