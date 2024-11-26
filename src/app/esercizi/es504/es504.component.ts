import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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

@Component({
  selector: 'app-es504',
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
  templateUrl: './es504.component.html',
  styleUrl: './es504.component.scss'
})
export class Es504Component implements OnInit {
  step = 1;
  puzzle: any = [];
  coveredImages: any;
  selectionableImages: any = [];
  listCovered: any = [];
  nCovered: any;
  timer: any;
  i: any = 0;
  nImages: any;
  livello: any;
  errori = 0;
  erroriTotali = 0;

  

  elementiLivello1 = [
    {src: "../../../assets/image_es504/lvl1/1.png", class: "white", active: false},
    {src: "../../../assets/image_es504/lvl1/2.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/3.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/4.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/5.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/6.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/7.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/8.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/9.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/10.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/11.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/12.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/13.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/14.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/15.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl1/16.png", class: "image", active: false},
  ]

  elementiLivello2 = [
    {src: "../../../assets/image_es504/lvl2/1.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/2.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/3.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/4.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/5.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/6.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/7.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/8.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/9.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/10.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/11.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/12.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/13.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/14.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/16.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/16.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/17.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/18.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/19.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/20.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/21.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/22.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/23.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/24.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl2/25.png", class: "image", active: false},
  ]

  elementiLivello3 = [
    {src: "../../../assets/image_es504/lvl3/1.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/2.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/3.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/4.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/5.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/6.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/7.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/8.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/9.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/10.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/11.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/12.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/13.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/14.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/15.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/16.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/17.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/18.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/19.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/20.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/21.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/22.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/23.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/24.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/25.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/26.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/27.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/28.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/29.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/30.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/31.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/32.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/33.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/34.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/35.png", class: "image", active: false},
    {src: "../../../assets/image_es504/lvl3/36.png", class: "image", active: false},
  ]

  ngOnInit() {
  }

  setLevel(n: number){
    this.livello = n;
    switch(n){
      case 1:
        this.puzzle = this.elementiLivello1;
        this.nImages = 16;
        this.nCovered = 4;
        this.coveredImages = "../../../assets/image_es504/coveredImages/lvl1.png";
        break;

      case 2:
          this.puzzle = this.elementiLivello2;
          this.nImages = 25;
          this.nCovered = 5;
          this.coveredImages = "../../../assets/image_es504/coveredImages/lvl2.png";
          break;

      case 3:
        this.puzzle = this.elementiLivello3;
        this.nImages = 36;
        this.nCovered = 6;
        this.coveredImages = "../../../assets/image_es504/coveredImages/lvl3.png";
        break;
    }

    for(let i = 0; i < this.nImages; i++){
      this.listCovered.push(i);
      this.selectionableImages.push();
    }

    this.listCovered = this.shuffleArray(this.listCovered);
    console.log(this.listCovered);

    this.listCovered = this.listCovered.slice(0, this.nCovered + 1);
    console.log(this.listCovered);
    this.startGame();
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  startGame(){
    for(let i = 0; i < this.nImages; i++){
      for(let j = 0; j < this.nCovered; j++){
        if(i == this.listCovered[j]){
          this.puzzle[i].src = this.coveredImages;
          this.puzzle[i].active = false;
        }
      }
    }

    console.log(this.selectionableImages)
    this.selectionableImages = this.shuffleArray(this.selectionableImages);
  }

  resetGame(){
    for(let i = 0; i < this.nImages; i++){
      this.listCovered.pop();
      this.selectionableImages.pop();
    }
  }
}