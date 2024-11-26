import { NgFor, NgStyle, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'app-es504',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardTitle,
    MatCardContent,
    MatGridListModule,
    CommonModule
  ],
  templateUrl: './es504.component.html',
  styleUrl: './es504.component.scss'
})
export class Es504Component {
    timeMillis: number = 0;
    buttons: { label: string }[] = [];
    firstRowImages: string[] = [];


    ngOnInit(): void {
        setInterval(() => {
            this.timeMillis += 100;
        }, 100);
    }
    constructor() {
      for (let i = 1; i <= 25; i++) {
        this.buttons.push({ label: `B${i}` });
      }
      for (let i = 1; i <= 25; i++) {
        this.firstRowImages.push(`assets/images_es504/lvl_1/mucca_0${i}.jpg`);
      }
    }
  
    onButtonClick(index: number): void {
      alert(`Hai cliccato sul bottone ${index + 1}!`);
    }
  }