import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { ExerciseService } from '../../exercise.service';


@Component({
  selector: 'app-es509',
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
  templateUrl: './es509.component.html',
  styleUrl: './es509.component.scss'
})
export class Es509Component implements OnInit {
  constructor(private ES: ExerciseService) { }
  //il set di variaibli + "l'iniezione" di HttpClient, che ci consente di scaricare il file txt
  numList: any[] = [];
  risposta = "";
  rispostacorretta = "";
  livello = 1;
  i = 0;
  opzioni: string[] = [];
  foto: string[] = [];
  pulsanti: string[] = [];
  percorso: any;
  numpulsanti = 0;
  seqNumeri: any[] = []; //questa roba è un array che va da 1 a numNumeri
  step: number = 1;
  errori: number = 0;
  //TODO: implementare la seeded random
  seed = "abracadabra";


  aggiornaRisposte(risposta: any) {
    this.risposta = risposta.value;
    this.risposta = this.risposta.toLowerCase();
    if (this.rispostacorretta == this.risposta)
      this.errori = 0;
    else
      this.errori = 1;
  }
  stepIncrease() {
    this.step++;

    if (this.step == 2) {
      switch (this.livello) {
        case 1:
          this.numpulsanti = 3;
          break;
        case 2:
          this.numpulsanti = 4;
          break;
        case 3:
          break;
      }
      for (var i = 0; i < this.numpulsanti; i++){
        var random = this.foto[Math.floor(Math.random() * this.numpulsanti)];
        while(this.pulsanti.includes(random))
          random = this.foto[Math.floor(Math.random() * this.numpulsanti)];

        this.pulsanti[i] = random;
        

      }

      if (!this.pulsanti.includes(this.rispostacorretta))
        this.pulsanti[Math.floor(Math.random() * this.numpulsanti)] = this.rispostacorretta;
    }


    // se step = 3, dobbiamo cross check

    if (this.step == 3) {
      this.ES.nextExercise(509, {errors: this.errori, time: this.timeMillis});
    }
  }


  rispostapulsanti(rispostapulsanti: string){
    if (this.rispostacorretta == rispostapulsanti)
      this.errori = 0;
    else
      this.errori = 1;
    this.stepIncrease();
  }


  timeMillis = 0;

  //funzione che viene eseguita all'avvio del componente
  ngOnInit(): void {
    this.livello = this.ES.currentInfo().difficulty;
    switch(this.livello){
      case 1:
        this.foto = ["albero", "barca", "cavallo", "forbici", "pugno", "scimmia", "topo"];
      break;
      case 2:
        this.foto = ["angelo", "citta", "leopardo", "lucertola", "pugile", "tennista", "unicorno"];
      break;
      case 3:
        this.foto = ["dottore", "formica", "gorilla", "polpo", "prigione", "temperatura", "toro"];
      break;
    }

    console.log(this.livello);

    setInterval(() => {
      this.timeMillis += 100;
    }
    , 100);

    this.i = Math.floor(Math.random() * 7);

    this.percorso = "../../../assets/images_es509/lvl" + this.livello + "/" + this.foto[this.i] + ".jpg";

    this.rispostacorretta = this.foto[this.i];
  }
}