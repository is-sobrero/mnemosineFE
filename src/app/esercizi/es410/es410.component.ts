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
  private inputSection:any;
  private placeholder:string = "_"
  public consigli:string[] = [];
  private dictionary:string[] = [];

  constructor(private ES: ExerciseService){}

  current_state = 0;

  errors:number = 0;
  display:string = "";
  word_typed = "";
  timeMillis:number = 0;

  level = 1;


  private list_of_words:any[] = [];

  ngOnInit(){
    setInterval(()=>{
      this.timeMillis += 500;
    }, 500);

    this.level = this.ES.currentInfo().difficulty;

    const fetch:Promise<any> = new Promise<any>((res:any)=>{
      console.log("fetching");
      let fetching = setInterval(()=>{
        this.connection.get("assets/exAssets/60000_parole_italiane.txt", {responseType: "text"}).subscribe(data =>{
          this.dictionary = data.split("\n");
        });
        switch(this.level){
          case 1:
            this.connection.get("assets/exAssets/es410_dialoghi/es410_semplice.txt", {responseType: "text"}).subscribe(data =>{
              this.list_of_words = data.split("\n");
            });
            break;
          case 2:
            this.connection.get("assets/exAssets/es410_dialoghi/es410_medio.txt", {responseType: "text"}).subscribe(data =>{
              this.list_of_words = data.split("\n");
            });
            break;
          case 3:
            this.connection.get("assets/exAssets/es410_dialoghi/es410_difficile.txt", {responseType: "text"}).subscribe(data =>{
              this.list_of_words = data.split("\n");
            });
            break;
          default:
            console.log("Undefined level");
            break;
        }
        if(this.list_of_words.length > 0 && this.dictionary.length > 0){
          console.log("Fetching completed");
          clearInterval(fetching);
          res(null);
        }else{
          console.log("continue fetching");
        }
      },50);
    }).then((res:any)=>{
      console.log("Setting phrases");
      this.setWord();
      res(null);
    });
  }

  setWord(){
    let random:number = Math.floor(Math.random() * this.list_of_words.length);
    var cache_word:string[] = []
    cache_word = this.list_of_words.at(random).split(" ");
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
    this.complete_string = ""+this.list_of_words.at(random);
    console.log("frase da mostrare: "+this.display);
    console.log("parola mancante: "+this.missing_word);

    this.consigli.push(this.missing_word);
    for(let i=0;i<random_trap.length;i++){
      this.consigli.push(""+this.dictionary.at(random_trap.at(i)));
    }
    this.consigli = this.shuffleArray(this.consigli);
    console.log("trappole e consigli: "+this.consigli.toString());
  }

  checkContent(index:number){
    let element = document.querySelector(".elem"+index)!;
    if(this.consigli[index].toLocaleLowerCase() === this.missing_word.toLowerCase()){
      element.classList.toggle("green");
      this.ES.nextExercise(410, { errors: this.errors , time: this.timeMillis });
    }else{
      element.classList.toggle("red");
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
