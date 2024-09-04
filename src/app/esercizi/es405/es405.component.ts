import { Component, OnInit, inject } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatInput,MatInputModule, MatFormField } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { MatButton } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { __await } from 'tslib';
import { ExerciseService } from '../../exercise.service';
import { start } from 'repl';

@Component({
  selector: 'app-es405',
  standalone: true,
  imports: [    MatCard, 
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
  templateUrl: './es405.component.html',
  styleUrl: './es405.component.scss'
})
export class Es405Component implements OnInit{
  constructor(private ES: ExerciseService) { }
  private connection = inject(HttpClient);
  private dictionary:string[] = [];
  private word_cache:string[] = [];
  private difficulty:any[][] = [
    ["a","c","l", "m", "p", "s", "t"],
    ["h", "k", "w", "z", "b", "q", "h"],
    ["sc", "av", "pr", "st","si", "sm", "tr", "vi","at", "la", "mi","me"]
  ];
  /*
  *
  *   Current state variable.
  *   This variable control the state of the application 
  *
  * 
  */

  current_state = 0;

  /* 
   *  variable used to manage the I/O system
   *
  */
  

  errors:number = 0;
  display:string = "";
  blend:string = "";
  word_typed = "";
  points:number = 0;


 /*
  *  Level: varable used to set the difficulty
  *  Default state: 0 ( easier );
  *
  */

  level = 0;

  private list_of_words:any[] = [];


  ngOnInit(){
    this.connection.get("assets/exAssets/60000_parole_italiane.txt", {responseType: "text"}).subscribe(data =>{
      this.dictionary = data.split("\n");
      for(var i=0;i<3;i++){
        this.getWord(this.dictionary,this.list_of_words);
      }
      this.setWord();
    });

  }

  setWord():void{
    let random:number = Math.floor(Math.random() * this.difficulty[this.level].length);
    this.display = ""+this.difficulty[this.level][random];
    console.log(this.display);
  }

  checkContent(){
 
    if(this.word_typed == "") return;

    if(this.list_of_words.includes(this.word_typed.toLocaleLowerCase()) && !this.word_cache.includes(this.word_typed.toLocaleLowerCase())){
      this.points += 1;
      this.word_cache.push(this.word_typed.toLocaleLowerCase());
    }else{
      this.errors += 1;
    }
    if(this.points >= 5){
      this.current_state = 1;
      this.ES.nextExercise(405, {errors: this.errors});
    }
  }

  changeState(newState:number){
    if(newState != this.level){
      this.level = newState;
      this.setWord();
    }
  }

  private getWord(dictionary:string[], list_of_words:string[]):void{
      for(let j=0; j<dictionary.length;j++){
        list_of_words.push(dictionary.at(j) as string);
  }
}
  onKey(event:any){
    this.word_typed = event.target.value;
  }
}
