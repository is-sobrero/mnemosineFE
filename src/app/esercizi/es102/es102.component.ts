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
  vettoreCoppie: any[] = [];
  errori = 0;

  ngOnInit(): void {
    //riempire il vettore di coppie con numeri da 1 a numeroStimoli
    var stimolo = 0;
    for (stimolo = 1; stimolo <= this.numeroStimoli; stimolo++) {
      this.vettoreCoppie.push({numero: stimolo, cliccato: true});
      this.vettoreCoppie.push({numero: stimolo, cliccato: true});
    }
    console.log(this.vettoreCoppie);
    //mescolare il vettore
    this.vettoreCoppie.sort(() => Math.random() - 0.5);
  }

  nextStep() {
    this.step++;
    if(this.step == 2) { 
      //rendere tutti i "cliccato" false
      for (var i = 0; i < this.vettoreCoppie.length; i++) {
        this.vettoreCoppie[i].cliccato = false;
      }
    }
  }

  verificaMemory() {
    //prendere il vettoreCoppie, contare quanti sono cliccati, se sono pari procedi
    var contatoreCliccati = 0;
    for (var i = 0; i < this.vettoreCoppie.length; i++) {
      if(this.vettoreCoppie[i].cliccato == true) {
        contatoreCliccati++;
      }
    }
    if(contatoreCliccati % 2 == 0) {
      //check if they are all clicked
      var allClicked = true;
      for (var i = 0; i < this.vettoreCoppie.length; i++) {
        if(this.vettoreCoppie[i].cliccato == false) {
          allClicked = false;
        }
      }
      if(allClicked) this.step++;
      //controlla a due a due se sono uguali, rendi non cliccate le coppie senza match
      for (var i = 0; i < this.vettoreCoppie.length; i++) {
       //se l'elemento è non cliccato allora continue 
       if(this.vettoreCoppie[i].cliccato == false) {
         continue;
       }
       var match = false;
       for (var j = 0; j < this.vettoreCoppie.length; j++) {
         if(this.vettoreCoppie[j].cliccato == false) {
           continue;
         }
         if(i == j) {
           continue;
         }
         if(this.vettoreCoppie[i].numero == this.vettoreCoppie[j].numero) {
            match = true;
            this.vettoreCoppie[i].cliccato = true;
            this.vettoreCoppie[j].cliccato = true;
            console.log(this.vettoreCoppie);
         }
       }
        if(match == false) {
          this.errori++;
          this.vettoreCoppie[i].cliccato = false;
        }
      }
    }
  }
}
