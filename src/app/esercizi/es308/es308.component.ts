import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor,NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es308',
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
  templateUrl: './es308.component.html',
  styleUrl: './es308.component.scss'
})
export class Es308Component {
  constructor(private ES: ExerciseService) { }
  //il set di variaibli + "l'iniezione" di HttpClient, che ci consente di scaricare il file txt
numList: any[] = [];
risposta = 0;
risultato = 0;
livello = 1;
numNumeri = 3;
seqNumeri: any[] = []; //questa roba è un array che va da 1 a numNumeri
step:number = 1;
errori:number = 0;
//TODO: implementare la seeded random
seed = "abracadabra";

aggiornaRisposte(risposta:any){
  this.risposta = risposta.value;
  console.log(this.risposta);


}
stepIncrease(){
  this.step++;
  // se step = 3, dobbiamo cross check
  
  if(this.step == 3){
    
    for (var i = 0; i < this.numNumeri; i++){
      this.risultato += this.numList[i];
    }
    
    if(this.risultato != this.risposta){
      this.errori++;
    }

    this.ES.nextExercise(308, {errors: this.errori, time: this.timeMillis});
  }
}


timeMillis = 0;

//funzione che viene eseguita all'avvio del componente
ngOnInit(): void {
  this.livello = this.ES.currentInfo().difficulty;
  switch(this.livello){
    case 1:
      this.numNumeri = 3;
    break;

    case 2:
      this.numNumeri = 5;
    break;

    case 3:
      this.numNumeri = 7;
    break;
  }
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

}
}