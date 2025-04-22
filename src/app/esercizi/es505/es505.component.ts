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
  selector: 'app-es505',
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
  templateUrl: './es505.component.html',
  styleUrl: './es505.component.scss'
})
export class Es505Component {
  constructor(private ES: ExerciseService) { }

  private connection = inject(HttpClient);
  private dictionary:any[] = [];
  public dummy_container:any[] = [];


  current_state = 0;

  errors:number = 0;
  image_link:string = "";
  timeMillis:number = 0;
  quarter:number = 0;

  dummy_0:any = null;
  dummy_1:any = null;
  dummy_2:any = null;
  dummy_3:any = null;

  level = 1;

  private list_of_words:any[] = [];
  ngOnInit(){
    setInterval(()=>{
      this.timeMillis += 500;
    }, 500);

    try{
      this.level = this.ES.currentInfo().difficulty;
      //this.level = 2;
    }catch(Error){
      console.error("unable to define a level by calling the backend service, assign level 1");
      this.level = 1;
    }
    if(this.level < 1 || this.level > 3){
      this.level = 1;
    }

    this.dummy_container.push(this.dummy_0);
    this.dummy_container.push(this.dummy_1);
    this.dummy_container.push(this.dummy_2);
    this.dummy_container.push(this.dummy_3);

    const prom:Promise<any> = new Promise<any>((res:any) => {
      let tm = setInterval(()=>{
        switch(this.level){
          case 1:
            this.connection.get("assets/exAssets/dizionario_immagini/dizionario_semplice.txt", {responseType: "text"}).subscribe(data =>{
              this.dictionary = data.split("\n");
            });
            break;

          case 2:
            this.connection.get("assets/exAssets/dizionario_immagini/dizionario_normale.txt", {responseType: "text"}).subscribe(data =>{
              this.dictionary = data.split("\n");
            });
            break;
          case 3:
            this.connection.get("assets/exAssets/dizionario_immagini/dizionario_difficile.txt", {responseType: "text"}).subscribe(data =>{
              this.dictionary = data.split("\n");
            });
            break;
          default:
            console.log("Undefinded level");
            break;
        }
        if(this.dictionary.length > 0){
          clearInterval(tm);
          res(null);
        }
      },50);
    }).then((res:any) => {
       this.getWord();
       this.setImage();
       res(null);
   });
  }

  checkContent(dummy_index:number){
    if(this.dummy_container[dummy_index].quarter == this.quarter && this.image_link == this.dummy_container[dummy_index].link){
      this.current_state = 1;
      this.ES.nextExercise(505, {errors: this.errors, time: this.timeMillis});
    }else{
      this.errors += 1;
    }
  }


  setImage(){
    var dummy_classes:string[] = [
      ".dummy_0",
      ".dummy_1",
      ".dummy_2",
      ".dummy_3",
    ];

    var dummy_quarter;
    var cached_dummy:any;

    for(var i=0;i<this.dummy_container.length;i+=1){
        dummy_quarter = 1+Math.floor(Math.random()*3);
        cached_dummy = this.dummy_container[i];
        cached_dummy = new DummyObject(""+this.list_of_words.at(i), dummy_quarter);
        cached_dummy.setObj(document.querySelector(dummy_classes[i]));
        this.dummy_container[i] = cached_dummy;
        console.log(cached_dummy);
    }

    for(var i=0;i<this.dummy_container.length;i+=1){
        this.dummy_container[i]?.setGraphics();
    }

    var rand = Math.floor(Math.random()*4);
    this.quarter = this.dummy_container[rand]?.quarter

    var cover:any = document.querySelector(".cover");
    switch(this.quarter){
      case 1:
            cover.style = "display:block; transform: translate(0px, -304px); width:150px;height:150px; background-color:black;";
            break;
      case 2:
            cover.style = "display:block; transform:translate(150px,-304px); width:150px;height:150px; background-color:black;";
            break;
      case 3:
            cover.style = "display:block; transform:translate(0px,-154px); width:150px;height:150px; background-color:black;";
            break;
      case 4:
            cover.style = "display:block; transform:translate(150px,-154px); width:150px;height:150px; background-color:black;";
            break;
    }

    this.image_link = this.dummy_container[rand]?.link;

    /*
     *
     * 1st quarter: top-left
     * 2nd quarter: top-right
     * 3th quarter: bottom-right
     * 4th quarter: bottom-left
     *
     * */
  }


  private getWord():void{
    var index:number = 0;
    var line:any[] = [];
    var obj = {};
    var str_obj:string = "";

    var i=0;
    while(i < 4){
      index = Math.floor(Math.random()*this.dictionary.length);
      line =  this.dictionary.at(index).split(",");
      this.list_of_words.push(line.at(0));
      i+=1;
    }
  }
}


class DummyObject{
  public link:string = "";
  public quarter:number = 0;
  public obj:any;

  constructor(link:string, quarter:number){
    this.link = link;
    this.quarter = quarter;
  }

  setObj(obj:any):void{
    this.obj = obj;
  }

  setGraphics():void{
    switch(this.quarter){
      case 1:
            this.obj.style = "transform-origin:top left;transform:translate(0px, 0px)";
            break;
      case 2:
            this.obj.style = "transform-origin:top right;transform:translate(-50%, 0%)";
            break;
      case 3:
            this.obj.style = "transform-origin:bottom right;transform:translate(0%, -50%) ";
            break;
      case 4:
            this.obj.style = "transform-origin:bottom left;transform:translate(-50%, -50%) ";
            break;
      default:
            console.log("Unusable quarter value\n");
            break;
    }
  }

}
