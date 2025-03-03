import { Component, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//Mat raised button
import { MatButtonModule } from '@angular/material/button';
import { ExerciseService } from '../../exercise.service';

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
    MatButtonModule,
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
  //Questo array viene utilizzato per disattivare una per volta ogni città selezionata
  arrayCliccato: number [] = [0,0,0,0,0,0,0,0,0,0,0,0];
  count = 0;
  cittaCorrente = 1;
  citta: string[] = [];
  listaCitta: string[] = [];
  cittaMostrate: string[] = [];
  cittaSelezionate: string[] = [];
  errori = 0;
  nCitta = 0;
  livelli: number[] = [4,6,8];
  nCliccati = 0;
  cittaScelta: string [] = [];
  step = 1;
  timer: any;

  private http = inject(HttpClient);

  constructor(private ES: ExerciseService) { }

  timeMillis = 0;

  //funzione che viene eseguita all'avvio del componente
  ngOnInit(): void {
    this.timeMillis = 0;
    setInterval(() => {
      this.timeMillis += 100;
    }, 100);
    this.nCitta = this.livelli[this.ES.currentInfo().difficulty-1];
    this.caricaCitta();
  }

  
  //Queste tre funzioni vengono richiamate separatamente per in base alla scelta del livello per aggiornare ilnumero di città

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
      });
  }

  nextStep() {
    this.step++;
    if(this.step == 3){
      this.timer = this.timeMillis;
      this.ES.nextExercise(110, {errors: this.errori, time: this.timer});
    }
  
  }



  iniziaGioco() {
    this.cittaSelezionate = this.listaCitta;
    this.cittaSelezionate.sort(() => Math.random() - 0.5);
    this.cittaSelezionate = this.cittaSelezionate.slice(0, 12);

    for(let i=0; i<12; i++){
      this.cittaSelezionate[i] = this.cittaSelezionate[i].toLocaleUpperCase();
    }
  }

  selezionaCitta () {
    //Carico cittàMostrate con un numero di città pari a nCittà, prese da città selezionate, e rimischio le città selezionate
    this.cittaMostrate = this.cittaSelezionate.slice(0, this.nCitta);
    this.cittaSelezionate.sort(() => Math.random() - 0.5);

    for(let i=0; i<this.nCitta; i++){
      this.cittaMostrate[i] = this.cittaMostrate[i].toLocaleUpperCase();
    }
  }

  //Verifico se la città selezionata è presente, di conseguenza calcolo il numero di errori
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
