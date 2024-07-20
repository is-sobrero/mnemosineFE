import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor,NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';

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
numList: any[] = [];
numNumeri = 3;
seqNumeri: any[] = []; //questa roba è un array che va da 1 a numNumeri
listaRisposte: any[] = [];
step:number = 1;
errori:number = 0;
//TODO: implementare la seeded random
seed = "abracadabra";

stepIncrease(){
  this.step++;
  // se step = 3, dobbiamo cross check
  if(this.step == 3){
    for (var i = 0; i < this.numNumeri; i++){
      if(this.numList[i] != this.listaRisposte[i]){
        this.errori++;
      }
    }
  }
}

timeMillis = 0;

ngOnInit(): void {
  this.step = 1;
  // ogni 100 millisecondi incrementa il tempo
      setInterval(() => {
        this.timeMillis += 100;
      }
      , 100);
  // faccio un ciclo for che cicla numNumeri volte, e pusha ogni volta un numero randomico tra 1 e 10, assicurandomi che non ci siano duplicati
  for (var i = 0; i< this.numNumeri; i++){
    this.seqNumeri.push(i + 1);
    //ATTENZIONE! 
    if(this.numNumeri > 10){
      alert("Il numero di numeri deve essere minore di 10");
      break;
    }
    var random = Math.floor(Math.random() * 10) + 1;
    while(this.numList.includes(random)){
      random = Math.floor(Math.random() * 10) + 1;
    }
    this.numList.push(random);
    
  } 

  var risultato = 0;
  var colore;

  for(i = 0; i < this.numNumeri; i++){
   colore = Math.floor(Math.random() * 2); //cosi va da 0 a 1
    if(colore == 0){
      risultato += this.numList[i]
      String(this.numList[i]);
      this.numList[i].style.color = "#00FF00";
    }
    else{
      risultato -= this.numList[i];
      String(this.numList[i]);
      this.numList[i].style.color = "#FF0000";
    }
  }

}
    // Il colore dei numeri non si vede
}


