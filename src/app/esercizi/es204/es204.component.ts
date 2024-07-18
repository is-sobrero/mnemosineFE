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

@Component({
  selector: 'app-es204',
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
  templateUrl: './es204.component.html',
  styleUrls: ['./es204.component.scss'],
})
export class Es204Component implements OnInit {
  livello = 1;
  oggetti: { id: number; target: boolean }[] = [];
  stimoloDaTrovare = 0;
  messaggio = '';

  ngOnInit(): void {
    this.generaOggetti();
  }

  generaOggetti() {
    this.oggetti = [];
    this.messaggio = '';

    let numeroOggetti;
    switch (this.livello) {
      case 1:
        numeroOggetti = 6;
        break;
      case 2:
        numeroOggetti = 12;
        break;
      case 3:
        numeroOggetti = 18;
        break;
      default:
        numeroOggetti = 6;
    }

    // Genera oggetti casuali con un oggetto target
    for (let i = 0; i < numeroOggetti; i++) {
      const isTarget = Math.random() < 0.2; // 20% di probabilità di essere il target
      this.oggetti.push({ id: i + 1, target: isTarget });
      if (isTarget) {
        this.stimoloDaTrovare = i + 1; // Salva l'ID del target da trovare
      }
    }
  }

  selezionaOggetto(id: number) {
    if (id === this.stimoloDaTrovare) {
      this.messaggio = 'Hai trovato lo stimolo target!';
    } else {
      this.messaggio = 'Questo non è lo stimolo target. Riprova!';
    }
  }

  cambiaLivello(nuovoLivello: number) {
    this.livello = nuovoLivello;
    this.generaOggetti();
  }
}
