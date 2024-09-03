import { Component, OnInit, inject } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatInput,MatInputModule, MatFormField } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { MatButton } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-es401',
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
  templateUrl: './es401.component.html',
  styleUrl: './es401.component.scss'
})
export class Es401Component implements OnInit{
  private connection = inject(HttpClient);
  private dictionary:string[] = [];
  private selectionCache:string[] = [];
  private difficulty:number[] = [4,6,8];
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
  blend:string = "";
  word_typed = "";


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
      this.setWord();
    });

  }

  setWord():void{
    this.display = ""+this.list_of_words.at(this.level);
    this.blend = this.shuffle(this.display);
    console.log(this.display);
  }

  checkContent(){
    if(this.display.toLowerCase() == this.word_typed.toLowerCase()){
      this.current_state = 1;
    }else{
      this.errors += 1;
      this.inputSection.value = "";
    }
  }

  changeState(newState:number){
    if(newState != this.level){
      this.level = newState;
      this.setWord();
    }
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

  private shuffle(word:any) {
    var arr:any[] = word.split("");
    var len = arr.length;
    var swap;
    var i;
  
    while (len > 0) {
      i = Math.floor(Math.random() * len);
      len--;
      swap = arr[len];
      arr[len] = arr[i];
      arr[i] = swap;
    }
    return arr.join(" ");
  }

  onKey(event:any){
    this.word_typed = event.target.value;
  }
}
