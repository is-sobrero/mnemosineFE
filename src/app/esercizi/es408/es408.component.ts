import { Component, OnInit, inject } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatInput,MatInputModule, MatFormField } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { MatButton } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-es408',
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
  templateUrl: './es408.component.html',
  styleUrl: './es408.component.scss'
})
export class Es408Component implements OnInit{
  private connection = inject(HttpClient);
  private connection2 = inject(HttpClient);
  private dictionary:any[] = [];
  private sinHeader:string[] = [];
  private sinHeaderMedium:string[] = [];
  private sinHeaderHarder:string[] = [];
  private inputSection:any; 
  private totalArray:any[] = [];
  private inputCache:string[] = [];
  selectedArray:any[] = [];

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

  private list_of_words:any[] = [];


  ngOnInit(){
    this.connection.get("assets/exAssets/sinonimi.txt", {responseType: "text"}).subscribe(data =>{
      this.dictionary = data.split("\n") as string[];

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

      }
      this.list_of_words.push(this.sinHeader);
      this.list_of_words.push(this.sinHeaderMedium);
      this.list_of_words.push(this.sinHeaderHarder);

      this.connection2.get("assets/exAssets/contrari.txt", {responseType: "text"}).subscribe(data =>{
        this.dictionary = data.split("\n") as string[];
        //console.log(this.dictionary.at(0));
        for(var i=0;i<this.dictionary.length;i++){
          var result:string[] = [];
          var subString:string;
          subString = this.dictionary.at(i);
          result = subString.split(":");
          subString = ""+result.at(1);
          this.totalArray.push(subString);
          
        }
        this.setWord();
      });
     
      this.inputSection = document.querySelector(".input");

    });

  }

  setWord():void{
    var rand:number = Math.floor(Math.random()*this.list_of_words.at(this.level).length);
    this.display = ""+this.list_of_words.at(this.level).at(rand);
    this.selectedArray = this.totalArray.at(rand).split(", ");
    this.inputCache = [];
    this.errors = 0;
    this.points = 0;
    console.log(this.selectedArray.toString());
  }

  checkContent(){
    if(this.word_typed != this.display && this.selectedArray.includes(this.word_typed) && !this.inputCache.includes(this.word_typed) && this.errors < 10){
      this.points += 1;
    }else{
      this.errors += 1;
    }
    if(this.errors>=10){
      this.current_state = -1;
    }
    if(this.points == this.selectedArray.length){
      this.current_state = 1;
    }
    this.inputCache.push(this.word_typed);
    this.inputSection.value = "";
  }

  onKey(event:any){
    this.word_typed = event.target.value;
  }
}
