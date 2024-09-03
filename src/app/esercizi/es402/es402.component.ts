import { Component, OnInit, inject } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatInput,MatInputModule, MatFormField } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { MatButton } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { __await } from 'tslib';

import * as googleTTS from "google-tts-api";


@Component({
  selector: 'app-es402',
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
  templateUrl: './es402.component.html',
  styleUrl: './es402.component.scss'
})
export class Es402Component implements OnInit{
  
  private connection = inject(HttpClient);
  private dictionary:string[] = [];
  private selectionCache:string[] = [];
  private difficulty:number[] = [4,6,8];
  private inputSection:any;
  private base_link:string = "https://res.cloudinary.com/djjwizrmr/video/upload/v1725207724/mnemosine/audio_402/";

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
  speech:any =  null;

 /*
  *  Level: varable used to set the difficulty
  *  Default state: 0 ( easier );
  *
  */

  level = 0;

 /*
  * List of word used for the selection. The index of 
  * the array rappresent the difficulty selected.
  * 
  *   index 0: easier;
  *   index 1: medium;
  *   index 3: harder; 
  * 
  */

  private list_of_words:string[] = [];

  ngOnInit(){
    this.connection.get("assets/exAssets/dizionarioitaliano1000.txt", {responseType: "text"}).subscribe(data =>{
      this.dictionary = data.split("\n");
      for(var i=0;i<3;i++){
        this.getWord(this.difficulty.at(i),this.dictionary,this.list_of_words);
      }
      this.inputSection = document.querySelector(".input");
      this.setWord(false);
    });
  }

  checkContent(){
    if(this.display.toLowerCase() == this.word_typed.toLowerCase()){
      this.current_state = 1;
      var obj:any = document.querySelector(".word_container_full");
      obj.style.display = "flex"; 
    }else{
      this.errors += 1;
      this.inputSection.value = "";
    }
  }

  setWord(redoing:boolean):void{
    this.display = ""+this.list_of_words.at(this.level);
    var container:any = document.querySelector(".word_container");
    var container_full:any = document.querySelector(".word_container_full");
   
    var text:any = null;
    var text_2:any = null;
    
    var obj:any = null;
    var obj_2:any = null;
    
    var cell_style:string = "padding:15px!important;margin:5px!important;margin-left:10px!important;margin-right:10px!important;border: 3px solid #383838!important;border-radius: 5px!important;width: min-content!important;height: min-content!important;filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));";
    var obj_style:string = "display: flex!important;flex-direction: row!important;justify-content: center!important;align-content: center!important;margin-top:40px!important;margin-bottom:30px!important;";
    
    var random_character:any = null;
        
    random_character = Math.floor(Math.random()*this.display.length);

    if(redoing === true){
      container.innerHTML = "";
      container_full.innerHTML = "";
    }

    this.speech = this.base_link+this.display+".mp3";
    //this.speech = this.base_link+"territorio"+".mp3";


    /* this.speech = this.GoogleTTS+this.display; */

    /* this.speech = googleTTS.getAudioUrl(this.display, {
       lang: "it",
        slow: false,
        host: "https://translate.google.com"
      });
    */

    
    obj = document.createElement("div");
    obj_2 = document.createElement("div");
    obj.setAttribute("class", "cell_container");
    obj.setAttribute("style", obj_style);
    obj_2.setAttribute("class", "cell_container");
    obj_2.setAttribute("style", obj_style);

    for(var i=0;i<this.display.length; i++){
      text = document.createElement("h1");
      text_2 = document.createElement("h1");
      text.setAttribute("class", "cell")
      text.setAttribute("style", cell_style);
      text_2.setAttribute("class", "cell")
      text_2.setAttribute("style", cell_style);

      text_2.innerHTML += this.display.at(i);
      if(i!=random_character){
        text.innerHTML = this.display.at(i);
      }else{
        text.innerHTML = "-";
      }
      obj.appendChild(text);
      obj_2.appendChild(text_2);
    }
    container.appendChild(obj);
    container_full.appendChild(obj_2);

    console.log(this.display);
  }


  private getWord(len:any, dictionary:string[], list_of_words:string[]):void{
    var word:string = "";
    var index:number = 0;

    while(true){
      index = Math.floor(Math.random()*this.dictionary.length);
      word = ""+this.dictionary.at(index);
      //console.log(word);
      if(this.selectionCache.length != 0){
        this.selectionCache.push(word);
        list_of_words.push(word);
        return;
      }else{
        if(!this.selectionCache.includes(word) && (word.length <= len)){
          this.selectionCache.push(word);
          list_of_words.push(word);
          return;
        }
      }
    }
  }

  onKey(event:any){
    this.word_typed = event.target.value;
  }
}
