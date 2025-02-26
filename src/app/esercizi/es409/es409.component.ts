import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ExerciseService } from '../../exercise.service';

import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { range } from 'rxjs';

interface PuzzleElement {
  id: any;
  src: string;
  active: boolean;
}

@Component({
  selector: 'app-es409',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatButton,
    MatInputModule,
    NgFor,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './es409.component.html',
  styleUrls: ['./es409.component.scss'], // Corretto da "styleUrl"
})
export class Es409Component implements OnInit {
  constructor(private ES: ExerciseService) { }

  step = 1;
  level = 0;
  errori = 0;
  timeMillis: any;
  listCampi:any[] = []; //Contiene la lista dei campi semantici per livello
  listParole:any[] = []; //Contiene la lista della parole per livello
  nParole = 0; //Numero di parole mostrate
  nAssociazioni = 0; //Contatore per il numero di parole da associare
  random : number = 0; //Indice randomico per estrarre il campo
  campo: any; //Contiene il campo estratto randomicamente tra i tre del livello

  ngOnInit(): void {
    this.level = this.ES.currentInfo().difficulty;

    switch(this.level){
      case 1:
        this.nParole = 3;
        this.listCampi = ["scuola", "natura", "musica"];
        this.listParole = [
          {word: "matita", field: "scuola"},
          {word: "quaderno", field: "scuola"},
          {word: "lavagna", field: "scuola"},
          {word: "banco", field: "scuola"},
          {word: "lezione", field: "scuola"},

          {word: "albero", field: "natura"},
          {word: "fiore", field: "natura"},
          {word: "giume", field: "natura"},
          {word: "montagna", field: "natura"},
          {word: "foglia", field: "natura"},

          {word: "nota", field: "musica"},
          {word: "strumento", field: "musica"},
          {word: "melodia", field: "musica"},
          {word: "ritmo", field: "musica"},
          {word: "canzone", field: "musica"},
        ];
      break;

      case 2:
        this.nParole = 3;
        this.listCampi = ["mare", "tempo", "cibo"];
        this.listParole = [
          {word: "litorale", field: "mare"},
          {word: "marea", field: "mare"},
          {word: "scogliera", field: "mare"},
          {word: "onda", field: "mare"},
          {word: "battigia", field: "mare"},

          {word: "brezza", field: "tempo"},
          {word: "temporale", field: "tempo"},
          {word: "umidità", field: "tempo"},
          {word: "foschia", field: "tempo"},
          {word: "grandine", field: "tempo"},

          {word: "sapore", field: "cibo"},
          {word: "aromi", field: "cibo"},
          {word: "condimento", field: "cibo"},
          {word: "pasto", field: "cibo"},
          {word: "digestione", field: "cibo"},
        ];
      break;

      case 3:
        this.nParole = 5;
        this.listCampi = ["medicina", "tecnologia", "geografia"];
        this.listParole = [
          {word: "febbre", field: "medicina"},
          {word: "sintomo", field: "medicina"},
          {word: "cura", field: "medicina"},
          {word: "infezione", field: "medicina"},
          {word: "guarigione", field: "medicina"},

          {word: "rete", field: "tecnologia"},
          {word: "software", field: "tecnologia"},
          {word: "algoritmo", field: "tecnologia"},
          {word: "connessione", field: "tecnologia"},
          {word: "dispositivo", field: "tecnologia"},

          {word: "estuario", field: "geografia"},
          {word: "altopiano", field: "geografia"},
          {word: "canyon", field: "geografiao"},
          {word: "montagna", field: "geografia"},
          {word: "tundra", field: "geografia"},
        ];
      break;
    }

    setInterval(() => {
      this.timeMillis += 100;
    }
    , 100);

    this.startGame();
  }

  startGame(){
    this.random = Math.floor(Math.random() * 3);
    this.campo = this.listCampi[this.random];

    let found = false; //Controlla che nell'estrazione di parole da associare vi è almeno una parola associabile al campo

    while(found == false){
      this.listParole = this.shuffleArray(this.listParole);

      for(let i = 0; i < this.nParole; i++){
        if(this.campo == this.listParole[i].field){
          this.listParole = this.listParole.slice(0, this.nParole);
          found = true;
          break;
        }
      }
    }
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
