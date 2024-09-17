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
  selector: 'app-es106',
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
  templateUrl: './es106.component.html',
  styleUrl: './es106.component.scss',
})

//il componente in se, implementa "OnInit" che ci consente di poter eseguire del codice all'avvio del componente
export class Es106Component implements OnInit {
  //il set di variaibli + "l'iniezione" di HttpClient, che ci consente di scaricare il file txt
  cliccato = false;
  //Questo array viene utilizzato per disattivare una per volta ogni città selezionata
  arraySequenza = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  arrayCliccato = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  buttonClicked: number[] = [];
  count = 0;
  errori = 0;
  nAccensioni = 0;
  nCliccati = 0;
  step = 1;
  i = 0;
  nameID: any;
  timer: any;
  seed = 'abracadabra';

  private http = inject(HttpClient);

  constructor() {}

  //funzione che viene eseguita all'avvio del componente
  ngOnInit(): void {
  }

  //Quando clicco il bottone per ricomincira, resetta i contatori
  resetVariabile(){
      this.arrayCliccato = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.nCliccati = 0;
      this.count = 0;
      this.errori = 0;
      clearInterval(this.timer);
  }
  
  //Queste tre funzioni vengono richiamate separatamente per in base alla scelta del livello per aggiornare ilnumero di città
  setLivello(N: number){
    this.nAccensioni = N;
    this.arraySequenza = this.arraySequenza.sort();
    this.avvioSequenza();
  }

  stepIncrease(){
    this.step++;
  }

  clickIncrease(){
    this.nCliccati++;

    if(this.nCliccati == this.nAccensioni){
      this.step++;
    }
  }

  async avvioSequenza(){
      this.timer = setInterval(() => {
      this.nameID = this.arraySequenza[this.i];
      this.i++;
    }, 1000);
  }

  sequenzaSelezionata(valore:number){
    this.buttonClicked[this.i] = valore;
    this.i++;
  }

}
