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
        this.listCampi = ["SCUOLA", "NATURA", "MUSICA"];
        this.listParole = [
          {word: "MATITA", field: "SCUOLA", active: true},
          {word: "QUADERNO", field: "SCUOLA", active: true},
          {word: "LAVAGNA", field: "SCUOLA", active: true},
          {word: "BANCO", field: "SCUOLA", active: true},
          {word: "LEZIONE", field: "SCUOLA", active: true},
          {word: "ALBERO", field: "NATURA", active: true},
          {word: "FIORE", field: "NATURA", active: true},
          {word: "FIUME", field: "NATURA", active: true},
          {word: "MONTAGNA", field: "NATURA", active: true},
          {word: "FOGLIA", field: "NATURA", active: true},
          {word: "NOTA", field: "MUSICA", active: true},
          {word: "STRUMENTO", field: "MUSICA", active: true},
          {word: "MELODIA", field: "MUSICA", active: true},
          {word: "RITMO", field: "MUSICA"},
          {word: "CANZONE", field: "MUSICA", active: true},
        ];
      break;

      case 2:
        this.nParole = 3;
        this.listCampi = ["MARE", "ASTRONOMIA", "CIBO"];
        this.listParole = [
          {word: "LITORALE", field: "MARE", active: true},
          {word: "MAREA", field: "MARE", active: true},
          {word: "SCOGLIERA", field: "MARE", active: true},
          {word: "ONDA", field: "MARE", active: true},
          {word: "BATTIPAGLIA", field: "MARE", active: true},
          {word: "COSTELLAZIONE", field: "ASTRONOMIA", active: true},
          {word: "NEBULOSA", field: "ASTRONOMIA", active: true},
          {word: "ORBITA", field: "ASTRONOMIA", active: true},
          {word: "SUPERNOVA", field: "ASTRONOMIA", active: true},
          {word: "ECLISSI", field: "ASTRONOMIA", active: true},
          {word: "SAPORE", field: "CIBO", active: true},
          {word: "AROMI", field: "CIBO", active: true},
          {word: "CONDIMENTO", field: "CIBO", active: true},
          {word: "PASTO", field: "CIBO", active: true},
          {word: "DIGESTIONE", field: "CIBO", active: true},
        ];
      break;

      case 3:
        this.nParole = 5;
        this.listCampi = ["MEDICINA", "TECNOLOGIA", "GEOGRAFIA"];
        this.listParole = [
          {word: "FEBBRE", field: "MEDICINA", active: true},
          {word: "SINTOMO", field: "MEDICINA", active: true},
          {word: "CURA", field: "MEDICINA", active: true},
          {word: "INFEZIONE", field: "MEDICINA", active: true},
          {word: "GUARIGIONE", field: "MEDICINA", active: true},
          {word: "RETE", field: "TECNOLOGIA", active: true},
          {word: "SOFTWARE", field: "TECNOLOGIA", active: true},
          {word: "ALGORITMO", field: "TECNOLOGIA", active: true},
          {word: "CONNESSIONE", field: "TECNOLOGIA", active: true},
          {word: "DISPOSITIVO", field: "TECNOLOGIA", active: true},
          {word: "ESTUARIO", field: "GEOGRAFIA", active: true},
          {word: "ALTOPIANO", field: "GEOGRAFIA", active: true},
          {word: "CANYON", field: "GEOGRAFIA", active: true},
          {word: "MONTAGNA", field: "GEOGRAFIA", active: true},
          {word: "TUNDRA", field: "GEOGRAFIA", active: true},
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
