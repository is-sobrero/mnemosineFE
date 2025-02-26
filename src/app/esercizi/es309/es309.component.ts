import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExerciseService } from '../../exercise.service';

interface Forma {
  forma: string;
  colore: string;
  content: string;
}

@Component({
  selector: 'app-es309',
  standalone: true,
  imports: [
    CommonModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule
  ],
  
  templateUrl: './es309.component.html',
  styleUrl: './es309.component.scss'
})
export class Es309Component {
  constructor(private ES: ExerciseService) { }

  livello:any = 0;
  corrette = 0;
  errore = 0;
  step = 1;
  regolaCorrente: any;
  displayedforme: Forma[] = [];
  intervalloRegola: any;
  timeMillis = 0;
  timerInterval: any;

  readonly forme = ['triangolo', 'quadrato', 'cerchio'];
  readonly colori = ['rosso', 'blu', 'verde'];
  readonly colorihard = ['rosso', 'blu', 'verde', 'giallo', 'viola'];
  readonly lettere = ['A', 'E', 'I', 'O', 'U'];

  readonly datiLivello = {
    0: { cambioRegola: 10000, numForme: 4 },
    1: { cambioRegola: 10000, numForme: 6 },
    2: { cambioRegola: 10000, numForme: 8 }
  };

  ngOnInit() {
    this.livello=this.ES.currentInfo().difficulty-1;
    this.timerInterval = setInterval(() => {
      if (this.step==2) {
        this.timeMillis += 100;
      }
    }, 100);
  }

  cominciaGioco() {
    this.step = 2;
    this.corrette = 0;
    this.errore = 0;
    this.timeMillis = 0;
    this.generaRegola();
    this.generaForma();

    const config = this.datiLivello[this.livello as keyof typeof this.datiLivello];
    
    this.intervalloRegola = setInterval(() => {
      this.generaRegola();
      this.generaForma();
    }, config.cambioRegola);
  }

  generaRegola(): void {
    const colori = this.livello === 2 ? this.colorihard : this.colori;
    const forma = this.forme[Math.floor(Math.random() * this.forme.length)];
    const colore = colori[Math.floor(Math.random() * colori.length)];

    if (this.livello === 2) {
      const lettera = this.lettere[Math.floor(Math.random() * this.lettere.length)];
      this.regolaCorrente = {
        forma,
        colore,
        condlettera: lettera,
        descrizione: `Clicca il ${forma} ${colore} contenente la lettera "${lettera}"`
      };
    } else {
      this.regolaCorrente = {
        forma,
        colore,
        descrizione: `Clicca il ${forma} ${colore}`
      };
    }
  }

  generaForma(): void {
    const config = this.datiLivello[this.livello as keyof typeof this.datiLivello];
    const colori = this.livello === 2 ? this.colorihard : this.colori;
    
    this.displayedforme = Array(config.numForme).fill(null).map(() => {
      const forma = this.forme[Math.floor(Math.random() * this.forme.length)];
      const colore = colori[Math.floor(Math.random() * colori.length)];
      const content = this.livello === 2 ? 
        this.lettere[Math.floor(Math.random() * this.lettere.length)] : '';

      return { forma, colore, content };
    });

    // Assicura che ci sia almeno una forma giusta
    const formaCorretta = Math.floor(Math.random() * this.displayedforme.length);
    this.displayedforme[formaCorretta] = {
      forma: this.regolaCorrente.forma,
      colore: this.regolaCorrente.colore,
      content: this.livello === 2 ? this.regolaCorrente.condlettera : ''
    };
  }

  controllaRisposta(forma: Forma, index: number): void {
    const formaGiusta = forma.forma === this.regolaCorrente.forma;
    const coloreGiusto = forma.colore === this.regolaCorrente.colore;
    const letteraGiusta = this.livello !== 2 || 
      forma.content === this.regolaCorrente.condlettera;

    if (formaGiusta && coloreGiusto && letteraGiusta) {
      this.corrette += 1;
      this.generaForma();
      this.stopgioco();
    } else {
      this.errore += 1;
      this.generaForma();
    }
  }

  stopgioco(){
    if (this.corrette>=20){
      this.ES.nextExercise(309, {errors: this.errore, time: this.timeMillis});
    }
  }
}