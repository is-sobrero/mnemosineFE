import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-es208',
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
    MatInputModule,
    MatLabel,
    HttpClientModule
  ],
  templateUrl: './es208.component.html',
  styleUrl: './es208.component.scss'
})
export class Es208Component {
  //il set di variaibli + "l'iniezione" di HttpClient, che ci consente di scaricare il file txt
  numList: any[] = [];        // Numeri casuali pushati
  colorList: any[] = [];      // Collettore di nomi di classe (blu o red)
  numNumeri = 3;
  seqNumeri: any[] = [];      // Array che va da 1 a numNumeri
  listaRisposte: any[] = [];

  step: number = 1;
  errori: number = 0;
  index = -1;

  stepIncrease() {
    this.step++;
    // se step = 3, dobbiamo cross check
    if (this.step == 3) {
      for (var i = 0; i < this.numNumeri; i++) {
        if (this.numList[i] != this.listaRisposte[i]) {
          this.errori++;
        }
      }
    }
  }

  timeMillis = 0;

  ngOnInit(): void {
    this.step = 1;

    setInterval(() => {
      this.timeMillis += 100;
    }, 100);

    /**
     * faccio un ciclo for su numNumeri volte, e pusha ogni volta un
     * numero randomico tra 1 e 10, assicurandomi che non ci siano
     * duplicati.
     */
    for (var i = 0; i < this.numNumeri; i++) {
      this.seqNumeri.push(i + 1);
      if (this.numNumeri > 10) {
        alert("Il numero di numeri deve essere minore di 10");
        break;
      }
      var random = Math.floor(Math.random() * 10) + 1;
      while (this.numList.includes(random)) {
        random = Math.floor(Math.random() * 10) + 1;
      }
      this.numList.push(random);

    }

    console.log(this.numList);

    var risultato = 0;
    var colore;

    for (i = 0; i < this.numNumeri; i++) {
      colore = Math.floor(Math.random() * 2); //cosi va da 0 a 1
      if (colore == 0) {
        risultato += this.numList[i]
        this.colorList.push("class=\"color-blue\"");
        console.log(this.colorList)
      }
      else {
        risultato -= this.numList[i];
        this.colorList.push("class=\"color-red\"");
        console.log(this.colorList)
      }
    }
    this.selectColor()
  }

  selectColor() {
    this.index = 0;
    const blkNums = document.querySelector("#blknums");
    if (blkNums) {
      let content = '';
      while (this.index < this.numList.length) {
        const num = this.numList[this.index];
        const colorClass = this.colorList[this.index];  // "class=\"color-blue\"" or "class=\"color-red\""

        // Append the number with the appropriate color class
        content += `<span class="${colorClass}">${num}</span> `;
        this.index++;
      }
      blkNums.innerHTML = content; // Set the final content once
    }
  }
  // Il colore dei numeri non si vede
}