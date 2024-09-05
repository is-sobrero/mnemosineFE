import { Component, OnInit, inject } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { MatButton } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es501',
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
  templateUrl: './es501.component.html',
  styleUrl: './es501.component.scss'
})
export class Es501Component implements OnInit{
  private ES:any;
  private canvas_background:any;
  private canvas_foreground:any;
  private cbx:any = null;
  private cfx:any = null;

  constructor(ES:ExerciseService){}

  /*
  *
  *   Current state variable.
  *   This variable control the state of the application 
  *
  * 
  */


  /* 
   *  variable used to manage the I/O system
   *
  */
  

  errors:number = 0;
  points:number = 0;
  current_obj:any;

/*

  canvas related propieties

*/

  canvas_width = 400;
  canvas_height = 400;
  bg_color = "#303030a0";
  fg_color = "#101010";


    /* 
      structure for command list:

      # note: use the local variable random_x and random_y to apply position on execution time 

      easy [
        "command1();command2();command3() .... commandN()",   1st figure
        "command1();command2()"                               2nd figure
        "command1();"                                         3rd figure
      ]
    */


 /*
  *  Level: varable used to set the difficulty
  *  Default state: 0 ( easier );
  *
  */

  level = 0;

  private easy:string[] = [
    "",
  ]
  private medium:string[] = [
    "",
  ]
  private hard:string[] = [
    "",
  ];

  private difficulty:any[] = [];

  ngOnInit(){
    /* set up the level of difficulty */
    this.difficulty.push(this.easy);
    this.difficulty.push(this.medium);
    this.difficulty.push(this.hard);

    this.canvas_background = document.getElementById("canvas_bg");
    this.canvas_foreground = document.getElementById("canvas_fg");
  

    if(this.canvas_background?.getContext){
      this.cbx = this.canvas_background?.getContext("2d");
    }
    if(this.canvas_foreground?.getContext){
      this.cfx = this.canvas_foreground?.getContext("2d");
    }

    this.beginDrawing();
  }

  checkContent(){
    let res = this.checkCanvasDrawing();

    if(res == 2){
      this.ES.nextExercise(501, {error:this.errors, points:this.points});
    }
    if(this.errors > 3){
      this.ES.nextExercise(501, {error:this.errors, points:this.points});
    }
    return;
  }

  checkCanvasDrawing():number{
    let status  = 0; /* status variable: 1 = correct; 2 = wrong */
    let padding = 0 /* range where a painting would be considered valid */

    /* 

        check if what the patient have drawn correspond with what is displayed 
        within a padding of N pixels ( could be related with diffìculty level )
    
    
    */

    return status;
  }

  beginDrawing():void{
    var random_x:any = Math.floor(Math.random()*this.canvas_width);
    var random_y:any = Math.floor(Math.random()*this.canvas_height);

    var random_cursor = Math.floor(Math.random()*this.difficulty.at(this.level)?.length);

    var commands:string[] = this.difficulty.at(this.level)?.at(random_cursor).split(";");

    this.cbx?.beginPath();

    /* 
    
      draw the background
    
    */
   
    //this.cbx.strokeStyle = this.bg_color;
    
    for(let i=0;i<commands.length;i++){
      eval(commands[i]);
    }
    
    this.cbx.stroke();

    /*

      Prepare the foreground
    
    */

    this.cfx.beginPath();
    //this.cfx.strokeStyle = this.fg_color;
    this.cfx.stroke();
  }
}
