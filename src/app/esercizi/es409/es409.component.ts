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
  timeMillis: any = 0;
  listCampi:any[] = []; //Contiene la lista dei campi semantici per livello
  listParole:any[] = []; //Contiene la lista della parole per livello
  nParole = 0; //Numero di parole mostrate
  nAssociazioni = 0; //Contatore per il numero di parole da associare
  random : number = 0; //Indice randomico per estrarre il campo
  campo: any; //Contiene il campo estratto randomicamente tra i tre del livello
  //In aiuto all'utente
  temp = 0; //Variabile temporanea per salvare il valore di nAccensioni prima che scali
  counter = 0; //Segna all'utente il numero di parole da selezionare

  ngOnInit(): void {
    this.level = this.ES.currentInfo().difficulty;

    switch(this.level){
      case 1:
        this.nParole = 3;
        this.listCampi = ["scuola", "natura", "musica"];
        this.listParole = [
          {word: "matita", field: "scuola", active: true},
          {word: "quaderno", field: "scuola", active: true},
          {word: "lavagna", field: "scuola", active: true},
          {word: "banco", field: "scuola", active: true},
          {word: "lezione", field: "scuola", active: true},
          {word: "albero", field: "natura", active: true},
          {word: "fiore", field: "natura", active: true},
          {word: "fiume", field: "natura", active: true},
          {word: "montagna", field: "natura", active: true},
          {word: "foglia", field: "natura", active: true},
          {word: "nota", field: "musica", active: true},
          {word: "strumento", field: "musica", active: true},
          {word: "melodia", field: "musica", active: true},
          {word: "ritmo", field: "musica"},
          {word: "canzone", field: "musica", active: true},
        ];
      break;

      case 2:
        this.nParole = 3;
        this.listCampi = ["mare", "astronomia", "cibo"];
        this.listParole = [
          {word: "litorale", field: "mare", active: true},
          {word: "marea", field: "mare", active: true},
          {word: "scogliera", field: "mare", active: true},
          {word: "onda", field: "mare", active: true},
          {word: "battigia", field: "mare", active: true},
          {word: "costellazione", field: "astronomia", active: true},
          {word: "nebulosa", field: "astronomia", active: true},
          {word: "orbita", field: "astronomia", active: true},
          {word: "supernova", field: "astronomia", active: true},
          {word: "eclissi", field: "astronomia", active: true},
          {word: "sapore", field: "cibo", active: true},
          {word: "aromi", field: "cibo", active: true},
          {word: "condimento", field: "cibo", active: true},
          {word: "pasto", field: "cibo", active: true},
          {word: "digestione", field: "cibo", active: true},
        ];
      break;

      case 3:
        this.nParole = 5;
        this.listCampi = ["medicina", "tecnologia", "geografia"];
        this.listParole = [
          {word: "febbre", field: "medicina", active: true},
          {word: "sintomo", field: "medicina", active: true},
          {word: "cura", field: "medicina", active: true},
          {word: "infezione", field: "medicina", active: true},
          {word: "guarigione", field: "medicina", active: true},
          {word: "rete", field: "tecnologia", active: true},
          {word: "software", field: "tecnologia", active: true},
          {word: "algoritmo", field: "tecnologia", active: true},
          {word: "connessione", field: "tecnologia", active: true},
          {word: "dispositivo", field: "tecnologia", active: true},
          {word: "estuario", field: "geografia", active: true},
          {word: "altopiano", field: "geografia", active: true},
          {word: "canyon", field: "geografia", active: true},
          {word: "montagna", field: "geografia", active: true},
          {word: "tundra", field: "geografia", active: true},
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
          found = true;
          break;
        }
      }
    }

    this.listParole = this.listParole.slice(0, this.nParole);

    for(let i = 0; i < this.nParole; i++)
      if(this.listParole[i].field == this.campo)
          this.nAssociazioni++;

    this.temp = this.nAssociazioni;
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkErrors(field:any){
    if(field != this.campo)
        this.errori++;
    
    this.nAssociazioni--;
    this.counter++;

    if(this.nAssociazioni == 0)
      this.ES.nextExercise(409, {errors: this.errori, time: this.timeMillis});
  }
}
