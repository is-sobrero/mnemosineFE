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
  livello = 1;
  citta: string[] = [];
  listaCitta: string[] = [];
  cittaMostrate: string[] = [];
  cittaSelezionate: [] = [];
  step = 1;
  timer: any;
  //TODO: implementare la seeded random
  seed = 'abracadabra';

  private http = inject(HttpClient);

  constructor() {}

  timeMillis = 0;

  //funzione che viene eseguita all'avvio del componente
  ngOnInit(): void {
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
      });
  }

  iniziaGioco() {
    this.cittaMostrate = [];
    this.cittaSelezionate = [];
    this.step = 1;
    this.selezionaCitta();
  }

  selezionaCitta () {}
}
