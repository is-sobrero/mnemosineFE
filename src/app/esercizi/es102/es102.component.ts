import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor,NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'app-es102',
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
    MatGridListModule
  ],
  templateUrl: './es102.component.html',
  styleUrl: './es102.component.scss'
})
export class Es102Component implements OnInit {
  step:number = 1;
  //questa variabile cambia in base alla difficoltà
  numeroStimoli = 6;
  vettoreCoppie: number[] = [];

  ngOnInit(): void {
    //riempire il vettore di coppie con numeri da 1 a numeroStimoli
    var stimolo = 0;
    for (stimolo = 1; stimolo <= this.numeroStimoli; stimolo++) {
      this.vettoreCoppie.push(stimolo);
      this.vettoreCoppie.push(stimolo);
    }
    console.log(this.vettoreCoppie);
    //mescolare il vettore
    this.vettoreCoppie.sort(() => Math.random() - 0.5);
  }

}
