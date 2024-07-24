import { Component, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { __values } from 'tslib';
/* 
Il modulo component, che rappresenta il componente, è decorato con il decoratore @Component.

Include un selettore che serve  per identificare il componente in un template HTML.
Il selettore è il nome del componente, che è app-es101 in questo caso.

Il campo standalone: true indica che il componente è autonomo e non dipende da altri componenti.

Il campo imports: [] è un array che contiene i moduli che il componente richiede per funzionare correttamente.

Il campo templateUrl: './es101.component.html' è il percorso del file HTML del template del componente.
Il campo styleUrl: './es101.component.scss' è il percorso del file SCSS del componente.
*/

@Component({
  selector: 'app-es110',
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
    HttpClientModule,
  ],
  templateUrl: './es110.component.html',
  styleUrl: './es110.component.scss',
})

//il componente in se, implementa "OnInit" che ci consente di poter eseguire del codice all'avvio del componente
export class Es110Component implements OnInit {
  //il set di variaibli + "l'iniezione" di HttpClient, che ci consente di scaricare il file txt
  cliccato = false;
  arrayCliccato: number [] = [0,0,0,0,0,0,0,0,0,0,0,0];
  count = 0;
  cittaCorrente = 1;
  citta: string[] = [];
  listaCitta: string[] = [];
  cittaMostrate: string[] = [];
  cittaSelezionate: string[] = [];
  errori = 0;
  nCitta = 0;
  nCliccati = 0;
  arrayShuffle: string [] = [];
  controlloIndici: number [] = [];
  cittaScelta: string [] = [];
  random = 0;
  step = 1;
  parola: string [] = [];
  timer: any;
  //TODO: implementare la seeded random
  seed = 'abracadabra';

  private http = inject(HttpClient);

  constructor() {}

  timeMillis = 0;

  //funzione che viene eseguita all'avvio del componente
  ngOnInit(): void {
  }

  resetVariabile(){
      this.cittaCorrente = 1;
      this.nCliccati;
      this.count = 0;
      this.errori = 0;
      for(let i=0; i<12; i++){
        this.arrayCliccato[i] = 0;
      }
  }

  quattroCitta(){
    this.nCitta = 4;
    this.caricaCitta();
  }

  seiCitta(){
    this.nCitta = 6;
    this.caricaCitta();
  }

  ottoCitta(){
    this.nCitta = 8;
    this.caricaCitta();
  }

  caricaCitta() {
    this.http
      .get('assets/dizionario_citta/dizionario_citta.txt', {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.listaCitta = data
          .split('\n')
          .map((citta) => citta.trim())
          .filter((citta) => citta.length > 0);

        this.iniziaGioco();
        this.selezionaCitta();
        this.shuffleArray();
      });
  }


  iniziaGioco() {
    this.cittaSelezionate = this.listaCitta;
    this.cittaSelezionate.sort(() => Math.random() - 0.5);
    this.cittaSelezionate = this.cittaSelezionate.slice(0, 12);
    //Avanti
  }

  selezionaCitta () {
    this.cittaMostrate = this.cittaSelezionate.slice(0, this.nCitta);
  }

  shuffleArray(){
    let j=0, N=0, max = 11, min = 0;
    for(let i=0; i<12; i++){
      if(i==0){
        this.random = Math.round(Math.random()*(max-min)+min);
        this.arrayShuffle[i] = this.cittaSelezionate[this.random];
        this.controlloIndici[j] = this.random;
        N++;
      } 
      else{
        this.random = Math.round(Math.random()*(max-min)+min);
        let uguale = false;
        for(j=0; j<N; j++){
          if(this.random == this.controlloIndici[j]){
            uguale = true;
            break;
          }
        }

        if(uguale == false){
          N++;
          this.controlloIndici[N-1] = this.random;
          this.arrayShuffle[i] = this.cittaSelezionate[this.random];
        }
        else{
          i--;
          uguale = false;
        }          

      }
    }

    this.cittaSelezionate = this.arrayShuffle;
  }

  controlloCitta(){
    let assente = true;
    for(let i=0; i<this.nCitta; i++){
      if(this.cittaMostrate[i] == this.cittaScelta[this.count]){
        assente = false;
      }
    }
    this.count++;  
    if(assente){
      this.errori += 1;
      assente = true;
    }  
  }
}
