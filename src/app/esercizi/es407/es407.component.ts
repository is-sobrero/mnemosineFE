import { Component, OnInit, inject } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatInput,MatInputModule, MatFormField } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { MatButton } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {ExerciseService} from "../../exercise.service";
import { AfterViewInit } from '@angular/core';


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
export class Es407Component implements OnInit, AfterViewInit{
  private connection = inject(HttpClient);
  private dictionary:any[] = [];
  private sinHeader:string[] = [];
  private sinHeaderMedium:string[] = [];
  private sinHeaderHarder:string[] = [];
  private inputSection:any;
  private totalArray:any[] = [];
  private inputCache:string[] = [];
  selectedArray:any[] = [];
  display_solutions:any[] = [];

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
    //this.level = 1;
  }

  setWord():void{
    var rand:number = Math.floor(Math.random()*this.list_of_words.at(this.level-1).length);
    this.display = ""+this.list_of_words.at(this.level-1).at(rand);
    this.selectedArray = this.totalArray.at(rand).split(", ");
    console.log(this.totalArray.at(rand));
    this.inputCache = [];
    this.errors = 0;
    this.points = 0;
    this.ngAfterViewInit();
  }

  ngAfterViewInit(){
    let container = document.querySelector(".check_word")!;

    if(this.selectedArray.length > 0){
      let random = Math.floor(Math.random() * this.selectedArray.length);
      let oldr = 0;
      let end:boolean = false;
      this.display_solutions = [];
      for(let i=0;i < this.level + 2;i++){
        while(!end){
          random = Math.floor(Math.random() * this.selectedArray.length);
          if(random != oldr){
            end = true
          }
        }
        this.display_solutions.push(this.selectedArray.at(random).toString());
        end = false;
        oldr = random;
      }

      let dummyIndex = Math.floor(Math.random()*this.totalArray.length);
      let localArray:string[] = this.totalArray.at(dummyIndex).split(", ");
      end = false;
      oldr = 0;
      random = Math.floor(Math.random()*localArray.length);
      for(let i=0;i< this.level + 2; i++){
        while(!end){
          random = Math.floor(Math.random()*localArray.length);
          if(oldr != random) end = true;
        }
        end = false;
        oldr = random;
        this.display_solutions.push(localArray.at(random));
      }
      this.display_solutions = this.shuffle(this.display_solutions);
    }
  }


  checkContent(index:number){
    let element = document.getElementById(""+index)!;
    console.log("Calling element number ", index);
    if(this.selectedArray.includes(this.display_solutions.at(index).toLowerCase()) && !this.inputCache.includes(this.display_solutions.at(index).toLowerCase())){
      this.points += 1;
      element.classList.toggle("green");
    }else{
      element.classList.toggle("red");
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
  shuffle(array: any[]):any[]{
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
