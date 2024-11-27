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
import { waitForAsync } from '@angular/core/testing';
import { rejects } from 'assert';
import {ExerciseService} from "../../exercise.service";


@Component({
  selector: 'app-es410',
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
  templateUrl: './es410.component.html',
  styleUrl: './es410.component.scss'
})
export class Es410Component implements OnInit{
  private connection = inject(HttpClient);
  private simple:any[] = [];
  private medium:any[] = [];
  private hard:any[] = [];
  private missing_word:string = "";
  public complete_string = "";
  private placeholder:string = "_"
  public consigli:string[] = [];
  private dictionary:string[] = [];

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
   *  variable used to manage the I/O system
   *
  */


  errors:number = 0;
  display:string = "";
  word_typed = "";
  timeMillis:number = 0;
 /*
  *  Level: varable used to set the difficulty
  *  Default state: 0 ( easier );
  *
  */


  level = this.ES.currentInfo().difficulty;


  private list_of_words:any[] = [];

  resolvePromise(){
    const result_0 = new Promise<string[]>((resolve,reject)=>{
      this.connection.get("assets/exAssets/es410_dialoghi/es410_semplice.txt", {responseType: "text"}).subscribe(data =>{
        resolve(data.split("\n"));
      });
    });
    const result_1 = new Promise<string[]>((resolve,reject)=>{
      this.connection.get("assets/exAssets/es410_dialoghi/es410_medio.txt", {responseType: "text"}).subscribe(data =>{
        resolve(data.split("\n"));
      })
    });
    const result_2 = new Promise<string[]>((resolve,reject)=>{
      this.connection.get("assets/exAssets/es410_dialoghi/es410_difficile.txt", {responseType: "text"}).subscribe(data =>{
        resolve(data.split("\n"));
      })
    });
    const result_3 = new Promise<string[]>((resolve,reject)=>{
      this.connection.get("assets/exAssets/dizionarioitaliano1000.txt", {responseType: "text"}).subscribe(data =>{
        resolve(data.split("\n"));
      });
    })

    result_0.then(res =>{
      this.simple = res;
    });
    result_1.then(res =>{
      this.medium = res;
    });
    result_2.then(res =>{
      this.hard = res;
    });
    result_3.then(res=>{
      this.dictionary = res;
    });
  }

  ngOnInit(){
    setInterval(()=>{
      this.timeMillis += 500;
    }, 500);
    this.resolvePromise();

    setTimeout(()=>{
      this.list_of_words.push(this.simple);
      this.list_of_words.push(this.medium);
      this.list_of_words.push(this.hard);
      //console.log(this.simple);
      //console.log(this.medium);
      //console.log(this.hard);
      this.setWord();
    }, 1000);
  }

  setWord(){
    let random:number = Math.floor(Math.random() * this.list_of_words.at(this.level).length);
    var cache_word:string[] = []
    cache_word = this.list_of_words.at(this.level).at(random).split(" ");
    let random_string:number = Math.floor(Math.random()* cache_word.length);

    let random_trap:any[] = [];

    for(let i=0;i<this.level-1+2;i++){
      random_trap.push(Math.floor(Math.random()*this.dictionary.length));
    }

    while(cache_word.at(random_string) == "-" ||
          cache_word.at(random_string) == "." ||
          cache_word.at(random_string) == ":" ||
          cache_word.at(random_string) == "?" ||
          cache_word.at(random_string) == "," ||
          cache_word.at(random_string) == '"'){
      random_string = Math.floor(Math.random()* cache_word.length);
    }

    for(let i=0;i<cache_word.length;i++){
      var wd:any = 0;
      if(i!=random_string){
        this.display += cache_word.at(i);
        this.display += " ";
      }else{
        wd = cache_word.at(i)?.length;
        for(let j=0;j<wd;j++){
          this.display += this.placeholder;
        }
        this.display += " ";
      }
    }
    this.missing_word = ""+cache_word.at(random_string)?.toLowerCase();
    this.complete_string = ""+this.list_of_words.at(this.level).at(random);
    console.log("frase da mostrare: "+this.display);
    console.log("parola mancante: "+this.missing_word);

    this.consigli.push(this.missing_word);
    for(let i=0;i<random_trap.length;i++){
      this.consigli.push(""+this.dictionary.at(random_trap.at(i)));
    }
    this.consigli = this.shuffleArray(this.consigli);
    console.log("trappole e consigli: "+this.consigli.toString());
  }
  checkContent(){
    if(this.word_typed == "") return;
    if(this.word_typed.toLocaleLowerCase() === this.missing_word.toLowerCase()){
      this.current_state = 1;
      this.ES.nextExercise(410, { errors: this.errors , time: this.timeMillis });
    }else{
      this.errors+=1;
    }

  }

  shuffleArray(array: string[]){
    return array.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
  };
  onKey(event:any){
    this.word_typed = event.target.value;
  }
}
