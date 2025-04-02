import { Component, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es205',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    NgFor,
    NgIf,
    CommonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './es205.component.html',
  styleUrl: './es205.component.scss',
})
export class Es205Component {
  livello = 0;
  immagineSinistra: string = '';
  immagineDestra: string = '';
  step = 0;
  error: number = 0;
  timeMillis: number = 0;
  differenzeTrovate: number = 0;
  totaleDifferenze: number = 0;
  generaBtns: any[] = [];

  constructor(private ES: ExerciseService) {}

  // Array di oggetti immagine per i tre livelli
  immagini = [
    {
      sinistra: 'assets/images_es205/zebra_sinistra.jpg',
      destra: 'assets/images_es205/zebra_destra.jpg',
      differenze: 3,
      posizioni: [
        {
          id: 'btn-diff1',
          bottom: '90px',
          right: '350px',
          width: '50px',
          height: '100px',
        },
        {
          id: 'btn-diff2',
          bottom: '100px',
          right: '17px',
          width: '25px',
          height: '53px',
        },
        {
          id: 'btn-diff3',
          bottom: '335px',
          right: '155px',
          width: '33px',
          height: '33px',
        },
      ],
    },
    {
      sinistra: 'assets/images_es205/cucina_sinistra.jpg',
      destra: 'assets/images_es205/cucina_destra.jpg',
      differenze: 5,
      posizioni: [
        {
          id: 'btn-diff1',
          bottom: '365px',
          right: '173px',
          width: '35px',
          height: '70px',
        },
        {
          id: 'btn-diff2',
          bottom: '230px',
          right: '80px',
          width: '30px',
          height: '55px',
        },
        {
          id: 'btn-diff3',
          bottom: '180px',
          right: '263px',
          width: '25px',
          height: '25px',
        },
        {
          id: 'btn-diff4',
          bottom: '220px',
          right: '360px',
          width: '40px',
          height: '100px',
        },
        {
          id: 'btn-diff5',
          bottom: '220px',
          right: '242px',
          width: '65px',
          height: '45px',
        },
      ],
    },
    {
      sinistra: 'assets/images_es205/camera_sinistra.jpg',
      destra: 'assets/images_es205/camera_destra.jpg',
      differenze: 7,
      posizioni: [
        {
          id: 'btn-diff1',
          bottom: '255px',
          right: '200px',
          width: '20px',
          height: '20px',
        },
        {
          id: 'btn-diff2',
          bottom: '135px',
          right: '155px',
          width: '30px',
          height: '30px',
        },
        {
          id: 'btn-diff3',
          bottom: '125px',
          right: '430px',
          width: '25px',
          height: '25px',
        },
        {
          id: 'btn-diff4',
          bottom: '100px',
          right: '330px',
          width: '25px',
          height: '25px',
        },
        {
          id: 'btn-diff5',
          bottom: '185px',
          right: '250px',
          width: '45px',
          height: '35px',
        },
        {
          id: 'btn-diff6',
          bottom: '60px',
          right: '187px',
          width: '60px',
          height: '40px',
        },
        {
          id: 'btn-diff7',
          bottom: '350px',
          right: '80px',
          width: '30px',
          height: '35px',
        },
      ],
    },
  ];

  ngOnInit(): void {
    setInterval(() => {
      this.timeMillis += 100;
    }, 100);

    this.livello = this.ES.currentInfo().difficulty-1;
    this.iniziaGioco();
  }

  iniziaGioco() {
    this.step = 1;
    this.differenzeTrovate = 0;
    this.totaleDifferenze = this.immagini[this.livello].differenze;
    this.immagineSinistra = this.immagini[this.livello].sinistra;
    this.immagineDestra = this.immagini[this.livello].destra;
    this.generaBtns = this.immagini[this.livello].posizioni;
  }

  contaErrori() {
    this.error += 1;
  }

  contaDifferenze(eleClass: any) {
    this.differenzeTrovate += 1;
    let ele = document.querySelector(`${eleClass}`) as HTMLElement;
    ele.style.display = 'none';
    if (this.differenzeTrovate === this.totaleDifferenze) {
      this.step = 2; // Fine del gioco
      this.ES.nextExercise(this.ES.currentInfo().id, {
        errors: this.error,
        time: this.timeMillis,
      });
    }
  }
}