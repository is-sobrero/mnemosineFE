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
  selector: 'app-es403',
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
  templateUrl: './es403.component.html',
  styleUrl: './es403.component.scss'
})
export class Es403Component implements OnInit{
  constructor(private ES: ExerciseService) { }

  private connection = inject(HttpClient);
  private dictionary:any[] = [];
  private inputSection:any;
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
  word_typed = "";
  image_link:string = "";
  timeMillis:number = 0;

 /*
  *  Level: varable used to set the difficulty
  *  Default state: 0 ( easier );
  *
  */

  level = 1;
  /*
  * List of word used for the selection. The index of
  * the array rappresent the difficulty selected.
  *
  *   index 0: easier;
  *   index 1: medium;
  *   index 3: harder;
  *
  */

  private list_of_words:any[] = [];
  ngOnInit(){
    console.log("initialize")
    setInterval(()=>{
      this.timeMillis += 500;
    }, 500);

    this.level = this.ES.currentInfo().difficulty;

    switch(this.level){
      case 1:
        this.connection.get("assets/exAssets/dizionario_immagini/dizionario_semplice.txt", {responseType: "text"}).subscribe(data =>{
          this.dictionary = data.split("\n");
          this.getWord();
          this.inputSection = document.querySelector(".input");
          this.setWord();
          console.log("query di immagini eseguita per livello 1");

        });
        break;

      case 2:
        this.connection.get("assets/exAssets/dizionario_immagini/dizionario_medio.txt", {responseType: "text"}).subscribe(data =>{
          this.dictionary = data.split("\n");
          this.getWord();
          this.inputSection = document.querySelector(".input");
          this.setWord();
          console.log("query di immagini eseguita per livello 1");
        });
        break;
      case 3:
        this.connection.get("assets/exAssets/dizionario_immagini/dizionario_difficile.txt", {responseType: "text"}).subscribe(data =>{
          this.dictionary = data.split("\n");
          this.getWord();
          this.inputSection = document.querySelector(".input");
          this.setWord();
          console.log("query di immagini eseguita per livello 1");
        });
        break;
      default:
        console.log("Undefinded level");
        break;
    }

  }

  checkContent(){
    if(this.display.toLowerCase() == this.word_typed.toLowerCase()){
      this.current_state = 1;
      this.ES.nextExercise(403, {errors: this.errors, time: this.timeMillis});
    }else{
      this.errors += 1;
    }
    this.inputSection.value = "";
  }

  setWord():void{
    console.log(this.list_of_words.at(0));
    var parse = JSON.parse(this.list_of_words.at(0));
    this.display = parse.word;
    this.image_link = parse.link;
    console.log(this.display);
  }


  private getWord():void{

    var index:number = 0;
    var line:any[] = [];
    var obj = {};
    var str_obj:string = "";

    while(true){
      index = Math.floor(Math.random()*this.dictionary.length);
      line =  this.dictionary.at(index).split(",");
      obj = {
        "link": ""+line.at(0),
        "word": ""+line.at(1)
      };
      str_obj = JSON.stringify(obj);
      this.list_of_words.push(str_obj);
      return;
    }
  }

  onKey(event:any){
    this.word_typed = event.target.value;
  }
}
