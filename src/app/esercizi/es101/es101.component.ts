import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  selector: 'app-es101',
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
    HttpClientModule
  ],
  templateUrl: './es101.component.html',
  styleUrl: './es101.component.scss'
})

//il componente in se, implementa "OnInit" che ci consente di poter eseguire del codice all'avvio del componente
export class Es101Component implements OnInit {
  //il set di variaibli + "l'iniezione" di HttpClient, che ci consente di scaricare il file txt
  randomWord: string = '';
  fullList:  string[] = [];
  wordList: string[] = [];
  numParole = 5;
  //TODO: implementare la seeded random
  seed = "abracadabra";

  private http = inject(HttpClient);

  timeMillis = 0;

  //funzione che viene eseguita all'avvio del componente
  ngOnInit(): void {
    // ogni 100 millisecondi incrementa il tempo
    setInterval(() => {
      this.timeMillis += 100;
    }
    , 100);
    // scarica il file txt e lo divide in un array di stringhe, le assegna random a randomWord e ne sceglie 5 a caso per la lista di parole
    this.http.get('assets/exAssets/dizionarioitaliano1000.txt', {responseType: 'text'}).subscribe(data => {
      this.fullList = data.split('\n');
      this.randomWord = this.fullList[Math.floor(Math.random() * this.fullList.length)];
      for(var i = 0; i < this.numParole; i++) {
        var word = this.fullList[Math.floor(Math.random() * this.fullList.length)].toLocaleUpperCase();
        //QUESTO WHILE SERVE A FAR SI CHE LE PAROLE SIANO LUNGHE ALMENO 3 LETTERE E NON CONTENGANO LA LETTERA "À"
        while (word.length < 3 || word.includes('À')) {
          word = this.fullList[Math.floor(Math.random() * this.fullList.length)].toLocaleUpperCase();
        }
        this.wordList.push(word);
      }
    });
  }


}
