import { Component, OnInit, inject } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatInput,MatInputModule, MatFormField } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { MatButton } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {ExerciseService} from "../../exercise.service";


@Component({
  selector: 'app-es407',
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
  templateUrl: './es407.component.html',
  styleUrl: './es407.component.scss'
})
export class Es407Component implements OnInit{
  private connection = inject(HttpClient);
  private dictionary:any[] = [];
  private sinHeader:string[] = [];
  private sinHeaderMedium:string[] = [];
  private sinHeaderHarder:string[] = [];
  private inputSection:any;
  private totalArray:any[] = [];
  private inputCache:string[] = [];
  selectedArray:any[] = [];


  constructor(private ES: ExerciseService){}

  /*
  *
  *   Current state variable.
  *   This variable control the state of the application
  *
  *
  */

  current_state = 0;

  /*
  *
  *   Current point tracker.
  *   Usefull to keep track of guessed words from the user
  *
  *
  */

  points = 0;


  /*
   *  variable used to manage the I/O system
   *
  */


  errors:number = 0;
  display:string = "";
  blend:string = "";
  word_typed = "";
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
    setInterval(()=>{
      this.timeMillis += 500;
    }, 500);

    this.connection.get("assets/exAssets/sinonimi.txt", {responseType: "text"}).subscribe(data =>{
      data = data.toLowerCase();
      this.dictionary = data.split("\n") as string[];
      //console.log(this.dictionary.at(0));


      for(var i=0;i<this.dictionary.length;i++){
        var result:string[] = [];
        var subString:string;
        subString = this.dictionary.at(i);
        result = subString.split(":");
        this.sinHeader.push(""+result.at(0));
        subString = ""+result.at(1);
        result = subString.split(", ");
        this.sinHeaderMedium.push(""+result.at(1));
        this.sinHeaderHarder.push(""+result.at(result.length-1));
        this.totalArray.push(subString);
      }
      this.list_of_words.push(this.sinHeader);
      this.list_of_words.push(this.sinHeaderMedium);
      this.list_of_words.push(this.sinHeaderHarder);
      this.inputSection = document.querySelector(".input");

      this.setWord();
    });
  this.level = this.ES.currentInfo().difficulty;
  }

  setWord():void{
    var rand:number = Math.floor(Math.random()*this.list_of_words.at(this.level-1).length);
    this.display = ""+this.list_of_words.at(this.level-1).at(rand);
    this.selectedArray = this.totalArray.at(rand).split(", ");
    this.inputCache = [];
    this.errors = 0;
    this.points = 0;
    console.log(this.selectedArray.toString());
  }

  checkContent(){
    if(this.selectedArray.includes(this.word_typed.toLowerCase()) && !this.inputCache.includes(this.word_typed.toLowerCase())){
      this.points += 1;
    }else{
      this.errors += 1;
    }
    if(this.points >= 3){
      this.current_state = 1;
      this.ES.nextExercise(407, { errors: this.errors, time: this.timeMillis });

    }
    this.inputCache.push(this.word_typed.toLowerCase());
    this.inputSection.value = "";
  }

  onKey(event:any){
    this.word_typed = event.target.value;
  }
}
