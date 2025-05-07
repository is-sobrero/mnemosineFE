import { Component, inject, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { ExerciseService } from '../../exercise.service';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-es306',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    NgFor,
    MatCardContent,
    MatButton,
  ],
  templateUrl: './es306.component.html',
  styleUrl: './es306.component.scss',
})
export class Es306Component implements OnInit {
  constructor(private ES: ExerciseService) {}
  private http = inject(HttpClient);

  livello: any;
  errori = 0;
  timeMillis = 0;
  tessereLivello: any[] = [];
  nTessere: any;

  tessereDomino = [
    {src: "../../assets/images_es306/domino_01.png"},
    {src: "../../assets/images_es306/domino_02.png"},
    {src: "../../assets/images_es306/domino_03.png"},
    {src: "../../assets/images_es306/domino_04.png"},
    {src: "../../assets/images_es306/domino_05.png"},
    {src: "../../assets/images_es306/domino_06.png"},
    {src: "../../assets/images_es306/domino_07.png"},
    {src: "../../assets/images_es306/domino_08.png"},
    {src: "../../assets/images_es306/domino_09.png"},
    {src: "../../assets/images_es306/domino_10.png"},
    {src: "../../assets/images_es306/domino_11.png"},
    {src: "../../assets/images_es306/domino_12.png"},
    {src: "../../assets/images_es306/domino_13.png"},
    {src: "../../assets/images_es306/domino_14.png"},
    {src: "../../assets/images_es306/domino_15.png"},
    {src: "../../assets/images_es306/domino_16.png"},
    {src: "../../assets/images_es306/domino_17.png"},
    {src: "../../assets/images_es306/domino_18.png"},
    {src: "../../assets/images_es306/domino_19.png"},
    {src: "../../assets/images_es306/domino_20.png"},
    {src: "../../assets/images_es306/domino_21.png"},
    {src: "../../assets/images_es306/domino_22.png"},
    {src: "../../assets/images_es306/domino_23.png"},
    {src: "../../assets/images_es306/domino_24.png"},
    {src: "../../assets/images_es306/domino_25.png"},
    {src: "../../assets/images_es306/domino_26.png"},
    {src: "../../assets/images_es306/domino_27.png"},
    {src: "../../assets/images_es306/domino_28.png"},
  ];

  ngOnInit(): void {
    setInterval(() => {
      this.timeMillis += 100;
    }, 100);

    this.setLevel();
  }

  setLevel(){
    this.livello = this.ES.currentInfo().difficulty;

    switch(this.livello){
      case 1:
        this.nTessere = 5;
      break;

      case 2:
        this.nTessere = 10;
      break;

      case 3:
        this.nTessere = 15;
      break;
    }

    this.tessereLivello = this.tessereDomino.slice(0, this.nTessere);

    console.log(this.tessereDomino);
    console.log(this.tessereLivello);
  }
}
