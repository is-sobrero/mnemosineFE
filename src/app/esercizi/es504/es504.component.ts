import { NgFor, NgStyle, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-es504',
  standalone: true,
  imports: [
    NgFor,
    NgStyle,
    NgIf,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    CommonModule
  ],
  templateUrl: './es504.component.html',
  styleUrl: './es504.component.scss'
})
export class Es504Component {
  step = 0;
  livello = 0;
  puzzlePezzi: any[] = [];
  slotpezzi: any[] = [];
  completati = 0;

  puzzles = [
      {
          pezzi: [
              { img: 'assets/images_es504/lvl_1/mucca_01.jpg', id: 1 },
              { img: 'assets/images_es504/lvl_1/mucca_02.jpg', id: 2 },
              { img: 'assets/images_es504/lvl_1/mucca_03.jpg', id: 3 }
          ]
      },
  ];

  selezionaLivello(livello: number) {
      this.livello = livello;
      this.step = 1;
      this.puzzlePezzi = this.puzzles[livello].pezzi;
      this.slotpezzi = this.puzzles[livello].pezzi.map((pezzo) => ({ id: pezzo.id, completato: false }));
  }

  iniziaTrascinamento(event: DragEvent, pezzo: any) {
      event.dataTransfer?.setData('text', pezzo.id);
  }

  completaSlot(event: DragEvent, slot: any) {
      const id = event.dataTransfer?.getData('text');
      if (id && slot.id === +id) {
          slot.completato = true;
          this.completati++;
      }
  }

  permessiTrascinamento(event: DragEvent) {
      event.preventDefault();
  }

  verificaCompletamento() {
      if (this.completati === this.slotpezzi.length) {
          this.step = 2;
      } else {
          alert('Completa il puzzle prima di procedere!');
      }
  }
}
