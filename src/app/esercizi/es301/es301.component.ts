import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor,NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';


@Component({
  selector: 'app-es301',
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
  templateUrl: './es301.component.html',
  styleUrl: './es301.component.scss'
})
export class Es301Component implements OnInit {
//il set di variaibli + "l'iniezione" di HttpClient, che ci consente di scaricare il file txt
seqNumeri: any[] = []; //questa roba è un array che va da 1 a numNumeri
listaRisposte: any[] = [];
step:number = 1;
numList: any[] = [];
errori:number = 0;
numNumeri = 0;
livello = 1;
//TODO: implementare la seeded random
seed = "abracadabra";

private http = inject(HttpClient);


aggiornaRisposte(risposta:any, indice:any){
  this.listaRisposte[indice-1] = risposta.value;
  console.log(this.listaRisposte);
}

stepIncrease(){
  this.step++;
  // se step = 3, dobbiamo cross check
  if(this.step == 3){
   
    var i = 0;
	while(i < 5){
		var j=i+1;
			while(j < 5){
				if(this.listaRisposte[i] > this.listaRisposte[j]){
          this.errori++;
				}
				j=j+1;
		  	}
		      i=i+1;
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

    seiNumeri(){
      for(var  i = 0; i < this.numNumeri; i++){
        this.numList.shift();
      }
      this.numNumeri = 6;
      this.ngOnInit();
   }

   noveNumeri(){
    for(var  i = 0; i < this.numNumeri; i++){
      this.numList.shift();
    }
    this.numNumeri = 9;
    this.ngOnInit();
 }

timeMillis = 0;

//funzione che viene eseguita all'avvio del componente
ngOnInit(): void {
  this.step = 1;
  // ogni 100 millisecondi incrementa il tempo
      setInterval(() => {
        this.timeMillis += 100;
      }
      , 100);
  // faccio un ciclo for che cicla numNumeri volte, e pusha ogni volta un numero randomico tra 1 e 10, assicurandomi che non ci siano duplicati
  for (var i = 0; i < this.numNumeri; i++){
    this.seqNumeri.push(i + 1);
    //ATTENZIONE! 
    if(this.numNumeri > 10){
      alert("Il numero di numeri deve essere minore di 10");
      break;
    }
    var random = Math.floor(Math.random() * 10);
    while(this.numList.includes(random)){
      random = Math.floor(Math.random() * 10);
    }
    this.numList.push(random);
  } 

}
}

