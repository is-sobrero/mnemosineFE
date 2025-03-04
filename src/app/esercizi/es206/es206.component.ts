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
export class Es206Component {
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

    //this.level = this.ES.currentInfo().difficulty;
    this.level = 1;

    switch(this.level){
      case 1:
        this.speed_index = 1;
        break;
    case 2:
        this.speed_index = 2;
        break;
    case 3:
        this.speed_index = 3;
        break;
    }

    document.addEventListener("keydown", (ev:KeyboardEvent)=>{
      if(ev.key == " "){
        this.input.push(ev.key);
      }
    });
    document.addEventListener("keyup", (ev:KeyboardEvent)=>{
      if(!(typeof (this.input.find((el)=> el == ev.key)) == undefined)){
        this.catch_line();
      }
    });
  }

  catch_line(){
    console.log("catching line");

    /*
     *  here the main logic that will check if the moving bar would be on top
     * of the red one will take place
     *
     *
     * */

    if(this.errors > 6) this.allow_skip = true;



  }

  skip_exercise(){
    this.errors = -1;
    this.ES.nextExercise(404, { errors: this.errors , time: this.timeMillis });
  }

}
