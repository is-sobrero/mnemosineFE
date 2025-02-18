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
  selector: 'app-es404',
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
  templateUrl: './es404.component.html',
  styleUrl: './es404.component.scss',
})
export class Es404Component {
  constructor(private ES: ExerciseService) { }

  private connection = inject(HttpClient);
  private dictionary:any[] = [];
  public dummy_container:any[] = [];


  current_state = 0;

  errors:number = 0;
  image_link:string = "";
  timeMillis:number = 0;
  quarter:number = 0;
  assets_path:string = "/assets/general_object/"
  show_image:number = 6;

  low_fetch:number = 3;
  mid_fetch:number = 5;
  high_fetch:number = 7;

  list_of_assets_name:string[] = [
    "clothes.txt",
    "car.txt",
    "car_brands.txt",
    "flowers.txt",
    "fruits.txt",
    "glasses.txt",
    "house.txt",
    "instruments.txt",
    "keys.txt",
    "pen.txt",
    "tools.txt"
  ];

  display_link:string[] = [];
  display_obj:any[] = [];
  display_obj_index:any[] = [];
  level = 1;
  list_of_categories:any[] = [];
  list_of_categories_tr:any[] = [];


  private list_of_assets:any[] = [];

  ngOnInit(){
    setInterval(()=>{
      this.timeMillis += 500;
    }, 500);
    this.level = this.ES.currentInfo().difficulty;
    console.log("Current level: "+this.level);
    if(this.level < 1 || this.level > 3 ) this.level = 1;

    switch(this.level){
      case 1:
          this.fetch_low_level_array();
          break;
      case 2:
          this.fetch_mid_level_array();
          break;
      case 3:
          this.fetch_high_level_array();
          break;
      default:
        console.log("Undefined level");
        break;
    }
    this.load_assets();
    this.prepare_class_ref();
  }


  checkContent(dummy_index:number){
    /*
     *
     *  create check content function
     *
     * */
  }

  prepare_class_ref(){
    let int = setInterval(()=>{
      if(this.list_of_categories.length > 0){
        for(let i=0;i<this.list_of_categories.length;i++){
          switch(this.list_of_categories[i]){
            case "car":
              this.list_of_categories_tr.push("Automobili");
              break;
            case "car_brands":
              this.list_of_categories_tr.push("Marche d'auto");
              break;
            case "clothes":
              this.list_of_categories_tr.push("Abiti");
              break;
            case "flowers":
              this.list_of_categories_tr.push("Fiori e Natura");
              break;
            case "fruits":
              this.list_of_categories_tr.push("Frutti");
              break;
            case "glasses":
              this.list_of_categories_tr.push("Occhiali");
              break;
            case "house":
              this.list_of_categories_tr.push("Case");
              break;
            case "instruments":
              this.list_of_categories_tr.push("Strumenti Musicali");
              break;
            case "keys":
              this.list_of_categories_tr.push("Chiavi");
              break;
            case "pen":
              this.list_of_categories_tr.push("Penne");
              break;
            case "tools":
              this.list_of_categories_tr.push("Attrezzi");
              break;
            default:
              console.log("Undefined reference");
              break;
          }
        }
        clearInterval(int);
      }
    }, 1);
  }


  load_assets(){
    switch (this.level) {
      case 1:
        this.set_assets(this.low_fetch);
        break;
      case 2:
        this.set_assets(this.mid_fetch);
        break;
      case 3:
        this.set_assets(this.high_fetch);
        break;
      default:
        console.log("Undefined Level");
        break;
    }
  }

  set_assets(n:number){
    let i=0;
    let random_cursor;
    let list_of_fetched_object:any[] = [];
    let int1 = setInterval(()=>{
      if(this.list_of_assets.length == n){
        while(i<this.show_image){
          random_cursor = Math.floor(Math.random()*n);
          let d:Assets = this.list_of_assets.at(random_cursor);
          let category = d.name;
          if(!this.list_of_categories.includes(category)){
            this.list_of_categories.push(category)
          }
          let random_object = Math.floor(Math.random()*d.list.length);
          if(!list_of_fetched_object.includes(random_object)){
            let end:boolean = false;
            let link:string = "nothing";
            while(!end){
              link = d.list.at(random_object).split(",").at(3);
              if(link.length > 0){
                end = true;
              }
            }
            this.display_link[i] = link;
            this.display_obj[i] = random_cursor;
            this.display_obj_index[i] = random_object;
            i++;
            console.log("image: "+link);
            list_of_fetched_object.push(random_object);
          }
        }
        for(i=0;i<this.show_image;i++){
          if(this.display_link){
          }
        }
        console.log("Display links: "+this.display_link);
        console.log("Display relations: "+this.display_obj);
        console.log("Display relations index: "+this.display_obj_index);
        console.log("List of fetched categories: "+this.list_of_categories);
        clearInterval(int1);
      }
    },1);
  }

  fetch_low_level_array() {
    let list_of_names:string[] = this.get_names(this.low_fetch);
    if(list_of_names.length > 0){
      for(let i=0;i<this.low_fetch;i++){
        this.get_assets(list_of_names[i]);
      }
    }
  }
  fetch_mid_level_array(){
    let list_of_names:string[] = this.get_names(this.mid_fetch);
    if(list_of_names.length > 0){
      for(let i=0;i<this.mid_fetch;i++){
        this.get_assets(list_of_names[i]);
      }
    }
  }

  fetch_high_level_array(){
    let list_of_names:string[] = this.get_names(this.high_fetch);
    if(list_of_names.length > 0){
      for(let i=0;i<this.high_fetch;i++){
        this.get_assets(list_of_names[i]);
      }
    }
  }

  get_assets(name:string){
    let query1:string = "";
    this.connection.get(this.assets_path+name, {responseType: "text"}).subscribe(data =>{
      query1 = data;
    });
    let check_ass1 = setInterval(()=>{
      if(query1?.length > 0){
        let assets_name:string = ""+ name.split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query1.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass1);
      }
    },1);
  }

  get_names(n:number):string[]{
    let list_of_names:string[] = [];
    //fetching names
    let i=0;
    while(i<n){
      let n:string = this.list_of_assets_name[Math.floor(Math.random() * this.list_of_assets_name.length)];
      if(i>0){
        if(!list_of_names.includes(n)){
          list_of_names[i] = n;
          i++;
        }
      }else{
        list_of_names[i] = n;
        i++;
      }
    }
    return list_of_names;
  }


  drag(ev:any){
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev:any){
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    console.log(ev.target.innerHTML);
    console.log("dragging element: "+data);
  }

  allowDrop(ev:any){
    ev.preventDefault();
  }

}

class Assets{
  name:string;
  list:any[];
  constructor(name:string, list:any[]){
    this.name = name;
    this.list = list;
  }
}
