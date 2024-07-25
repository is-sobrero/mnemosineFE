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
import { MatFormField, MatLabel } from '@angular/material/form-field';
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
  selector: 'app-es303',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatButton,
    NgFor,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './es303.component.html',
  styleUrl: './es303.component.scss',
})

//il componente in se, implementa "OnInit" che ci consente di poter eseguire del codice all'avvio del componente
export class Es303Component implements OnInit {
  //il set di variaibli + "l'iniezione" di HttpClient, che ci consente di scaricare il file txt
  cliccato = false;
  listaParole: string [] = [];
  parola: string [] = [];
  arrayParole: string [] = [];
  paroleInserite: string [] = [];
  nParole = 0;
  step = 1;
  errori = 0;
  
  timer: any;
  //TODO: implementare la seeded random
  seed = 'abracadabra';

  private http = inject(HttpClient);

  constructor() {}

  timeMillis = 0;

  ngOnInit(): void {
    if(this.step != 1){
      this.http
      .get('assets/lista_parole/listaParole.txt', {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.listaParole = data
          .split('\n')
          .map((parola) => parola.trim())
          .filter((parola) => parola.length > 0);

          this.visualizzaParole();
      });
    }
  }

  treParole(){
    this.nParole = 3;
    this.step++;
    this.ngOnInit();
  }

  seiParole(){
    this.nParole = 6;
    this.step++;
    this.ngOnInit();
  }

  noveParole(){
    this.nParole = 9;
    this.step++;
    this.ngOnInit();
  }

  visualizzaParole(){
    this.arrayParole = this.listaParole;
    this.arrayParole.sort(() =>  Math.random() - 0.5);
    this.arrayParole = this.arrayParole.slice(0, this.nParole);
  }

  aggiornaArray(parola:any, i:any){
    this.paroleInserite[i-1] = parola.value;
    if(i == 3){
      this.cliccato = true;
      this.step++;
    }
  }

  controlloParole(){
    for(let i=0; i<this.nParole; i++){
      if(this.paroleInserite[i] != this.arrayParole[i]){
        this.errori++;
      }
    }
  }
  
}