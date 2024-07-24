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
  //private GoogleTTS:string = "https://translate.google.com/translate_tts?ie=UTF-8&tl=it-IT&client=tw-ob&q=";
  
  private connection = inject(HttpClient);
  private dictionary:any[] = [];
  private selectionCache:string[] = [];
  /*
  *
  * Here the difficulty variable is pretty much dependent
  * by how the image_dictionary library is written. 
  * Basically every value is interpreted as a separator
  * for simple, medium and hard word. This is usefull to 
  * put all the necessay assets into a single file.
  *
  */

  private difficulty:number[] = [0,1,2];

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
    return;
    this.connection.get("assets/exAssets/dizionario_immagini.txt", {responseType: "text"}).subscribe(data =>{
      this.dictionary = data.split("\n");
      for(var i=0;i<3;i++){
        this.getWord(this.difficulty.at(i),this.dictionary,this.list_of_words);
      }
      this.setWord();
    });
  }

  checkContent(){
    if(this.display == this.word_typed){
      this.current_state = 1;
    }else{
      this.errors += 1;
    }
  }

  setWord():void{
    var parse = JSON.parse(""+this.list_of_words.at(this.level));
    this.display = parse.word;
    this.image_link = parse.link;
    console.log(this.display);
  }


  private getWord(diff:any, dictionary:string[], list_of_words:string[]):void{

    var index:number = 0;
    var start_point:number;
    var line:any[] = [];
    var obj = {};
    var str_obj:string = "";

    while(true){
      start_point = this.dictionary.indexOf(diff);
      index = Math.floor(Math.random()*this.dictionary.length-start_point)+start_point;
      line = this.dictionary.at(index).split(",");
      obj = {
        "link": ""+line.at(0),
        "word": ""+line.at(1)
      };
      str_obj = JSON.stringify(obj);

      //console.log(word);
      if(this.selectionCache.length != 0){
        this.selectionCache.push(str_obj);
        list_of_words.push(str_obj);
        return;
      }else{
        if(!this.selectionCache.includes(str_obj)){
          this.selectionCache.push(str_obj);
          list_of_words.push(str_obj);
          return;
        }
      }
    }
  }

  onKey(event:any){
    this.word_typed = event.target.value;
  }
}
