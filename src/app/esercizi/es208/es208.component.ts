import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgClass, NgFor,NgIf } from '@angular/common';
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
    NgClass,
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
operazioni: any[] = [];
numNumeri = 3;
risultato = 0;
livello = 1;
risposta = 0;
colore = 0;
seqNumeri: any[] = []; //questa roba è un array che va da 1 a numNumeri
listaRisposte: any[] = [];
step:number = 1;
errori:number = 0;
//TODO: implementare la seeded random
seed = "abracadabra";

ngClassConverter(i:any){
  if(this.operazioni[i] == 0)
    return "Blu";
  
  else
    return "Rosso";
}

aggiornaRisposte(risposta:any){
  this.risposta = risposta.value;
  console.log(this.risposta);
}

stepIncrease(){
  this.step++;
  // se step = 3, dobbiamo cross check
  if(this.step == 3){
    if(this.risultato != this.risposta){
      this.errori++;
    }
  }
}

resetVar(){
  this.seqNumeri = [];
  this.step = 1;
  this.numList = [];
  this.errori = 0;
  this.numNumeri = 0;
  this.livello = 1;
}

treNumeri(){
  for(var  i = 0; i < this.numNumeri; i++){
    this.numList.shift();
  }
   this.numNumeri = 3;
   this.ngOnInit();
}

cinqueNumeri(){
  for(var  i = 0; i < this.numNumeri; i++){
    this.numList.shift();
  }
  this.numNumeri = 5;
  this.ngOnInit();
}

setteNumeri(){
for(var  i = 0; i < this.numNumeri; i++){
  this.numList.shift();
}
this.numNumeri = 7;
this.ngOnInit();
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

  for(i = 0; i < this.numNumeri; i++){
    this.colore = Math.floor(Math.random() * 2); //cosi va da 0 = 'blu' a 1 = 'rosso'
    if(this.colore == 0){
      this.risultato += this.numList[i]
      this.operazioni[i] = 0;
    }
    else{
      this.risultato -= this.numList[i];
      this.operazioni[i] = 1;
    }
  }

}
}

