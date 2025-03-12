import { Component, OnInit, inject } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatInput,MatInputModule, MatFormField } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { MatButton } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { __await } from 'tslib';
import { start } from 'repl';
import { ExerciseService } from '../../exercise.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-es206',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardFooter,
    NgFor,
    MatButton,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgIf
  ],
  templateUrl: './es206.component.html',
  styleUrl: './es206.component.scss'
})
export class Es206Component implements AfterViewInit, OnInit{
  constructor(private ES: ExerciseService) { }
  current_state = 0;
  errors:number = 0;
  timeMillis:number = 0;
  speed_index:number = 0;
  level = 1;
  input:Array<string> = [];
  allow_skip:boolean = false;

  ngOnInit(){
    console.log("initialize");
    setInterval(()=>{
      this.timeMillis += 500;
    }, 500);

    this.level = this.ES.currentInfo().difficulty;
    //this.level = 1;

    switch(this.level){
      case 1:
        this.speed_index = 1;
        break;
    case 2:
        this.speed_index = 1.4;
        break;
    case 3:
        this.speed_index = 2;
        break;
    default:
        this.speed_index = 1;
        break;
    }
  }

  ngAfterViewInit(){
    var can:HTMLCanvasElement = document.getElementById("game-ctx")! as HTMLCanvasElement;
    var ctx:CanvasRenderingContext2D = can.getContext("2d")! as CanvasRenderingContext2D;
    let WIDTH:number = 400;
    let HEIGHT:number = 200;
    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;
    let BAR_WIDTH:number = 20;
    let BAR_HEIGHT:number = 100;
    let DELTA_TIME = 16; // in milliseconds: 16ms = 60 frame per second
    var random_pos_x:number = BAR_WIDTH+Math.floor(Math.random()*(WIDTH-(BAR_WIDTH*2)));
    let c_pos_x:number = 0;
    let BACKGROUND = "rgba(255,255,255,255)";
    let RC_COLOR = "rgba(74,74,74,255)";
    let C_COLOR = "rgba(232, 87, 14,255)";

    let end:boolean = false;
    const gameLoop = ()=>{
      let direction:number = 2;
      let int = setInterval(() => {
          if(c_pos_x > WIDTH-BAR_WIDTH/2) direction = direction*-1;
          if(c_pos_x < 0) direction = direction*-1;

          ctx.beginPath();

          ctx.fillStyle = BACKGROUND;
          ctx.fillRect(0,0, WIDTH, HEIGHT);
          ctx.fillStyle = RC_COLOR;
          ctx.fillRect(random_pos_x,BAR_HEIGHT-HEIGHT/4,BAR_WIDTH,BAR_HEIGHT);
          ctx.fillStyle = C_COLOR;
          ctx.fillRect(c_pos_x, BAR_HEIGHT-HEIGHT/4, BAR_WIDTH/2, BAR_HEIGHT);
          c_pos_x += direction*this.speed_index;

          ctx.stroke();
          if(end) clearInterval(int);

      }, DELTA_TIME);
    };
    gameLoop();
    document.addEventListener("keydown", (ev:KeyboardEvent)=>{
      if(ev.key == " "){
        this.input.push(ev.key);
      }
    });
    document.addEventListener("keyup", (ev:KeyboardEvent)=>{
      if(this.input.indexOf(" ") != -1){
        if(
            Math.floor(c_pos_x) >= random_pos_x && Math.floor(c_pos_x) <= random_pos_x+BAR_WIDTH
        ){
          console.log("Cursor Inside the grey bar");
          this.current_state = 1;
          end = true;
          setTimeout(() => {
            this.ES.nextExercise(404, { errors: this.errors , time: this.timeMillis });
          }, 1000);
        }else{
          this.errors += 1;
        }
        if(this.errors > 6) this.allow_skip = true;
      }
    });
  }

  skip_exercise(){
    this.errors = -1;
    this.ES.nextExercise(404, { errors: this.errors , time: this.timeMillis });
  }

}
