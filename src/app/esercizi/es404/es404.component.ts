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

  low_fetch:number = 2;
  mid_fetch:number = 4;
  high_fetch:number = 6;

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

  level = 1;

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
    }
    this.load_assets();
  }


  checkContent(dummy_index:number){
    /*
     *
     *  create check content function
     *
     * */
  }

  load_assets(){
    let i=0;
    let random_cursor;
    let link;
    let list_of_fetched_object:any[] = [];
    switch (this.level) {
      case 1:
        let int1 = setInterval(()=>{
          if(this.list_of_assets.length == this.low_fetch){
            while(i<this.show_image){
              random_cursor = Math.floor(Math.random()*this.low_fetch);
              let d:Assets = this.list_of_assets.at(random_cursor);
              let random_object = Math.floor(Math.random()*d.list.length);
              if(!list_of_fetched_object.includes(random_object)){
                link = d.list.at(random_object)?.split(",")?.at(3);
                this.display_link[i] = link;
                this.display_obj[i] = random_object;
                i++;
                list_of_fetched_object.push(random_object);
              }
            }
            console.log("Display links: "+this.display_link);
            console.log("Display relations: "+this.display_obj);
            clearInterval(int1);
          }
        },1);
        break;
      case 2:
          let int2 = setInterval(()=>{
          if(this.list_of_assets.length == this.mid_fetch){
            while(i<this.show_image){
              random_cursor = Math.floor(Math.random()*this.mid_fetch);
              let d:Assets = this.list_of_assets.at(random_cursor);
              let random_object = Math.floor(Math.random()*d.list.length);
              if(!list_of_fetched_object.includes(random_object)){
                link = d.list.at(random_object)?.split(",")?.at(3);
                this.display_link[i] = link;
                this.display_obj[i] = random_object;
                i++;
                list_of_fetched_object.push(random_object);
              }
            }
            console.log("Display links: "+this.display_link);
            console.log("Display relations: "+this.display_obj);
            clearInterval(int2);
          }
        },1);

        break;
      case 3:
        let int3 = setInterval(()=>{
          if(this.list_of_assets.length == this.high_fetch){
            while(i<this.show_image){
              random_cursor = Math.floor(Math.random()*this.high_fetch);
              let d:Assets = this.list_of_assets.at(random_cursor);
              let random_object = Math.floor(Math.random()*d.list.length);
              if(!list_of_fetched_object.includes(random_object)){
                link = d.list.at(random_object)?.split(",")?.at(3);
                this.display_link[i] = link;
                this.display_obj[i] = random_object;
                i++;
                list_of_fetched_object.push(random_object);
              }
            }
            console.log("Display links: "+this.display_link);
            console.log("Display relations: "+this.display_obj);
            clearInterval(int3);
          }
        },1);

        break;
      default:
        console.log("Undefined Level");
        break;
    }

  }


  fetch_low_level_array() {
    let list_of_names:string[] = this.get_names(this.low_fetch);

    let query1:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[0], {responseType: "text"}).subscribe(data =>{
      query1 = data;
    });
    let check_ass1 = setInterval(()=>{
      if(query1?.length > 0){
        let assets_name:string = ""+ list_of_names[0].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query1.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass1);
      }
    },1);

    let query2:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[1], {responseType: "text"}).subscribe(data =>{
      query2 = data;
    });
    let check_ass2 = setInterval(()=>{
      if(query2?.length > 0){
        let assets_name:string = ""+ list_of_names[1].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query2.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass2);
      }
    },1);

  }
  fetch_mid_level_array(){
    let list_of_names:string[] = this.get_names(this.mid_fetch);

    let query1:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[0], {responseType: "text"}).subscribe(data =>{
      query1 = data;
    });
    let check_ass1 = setInterval(()=>{
      if(query1?.length > 0){
        let assets_name:string = ""+ list_of_names[0].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query1.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass1);
      }
    },1);

    let query2:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[1], {responseType: "text"}).subscribe(data =>{
      query2 = data;
    });
    let check_ass2 = setInterval(()=>{
      if(query2?.length > 0){
        let assets_name:string = ""+ list_of_names[1].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query2.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass2);
      }
    },1);

    let query3:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[2], {responseType: "text"}).subscribe(data =>{
      query3 = data;
    });
    let check_ass3 = setInterval(()=>{
      if(query3?.length > 0){
        let assets_name:string = ""+ list_of_names[2].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query3.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass3);
      }
    },1);


    let query4:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[3], {responseType: "text"}).subscribe(data =>{
      query4 = data;
    });
    let check_ass4 = setInterval(()=>{
      if(query4?.length > 0){
        let assets_name:string = ""+ list_of_names[3].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query4.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass4);
      }
    },1);
  }

  fetch_high_level_array(){
    let list_of_names:string[] = this.get_names(this.high_fetch);

    let query1:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[0], {responseType: "text"}).subscribe(data =>{
      query1 = data;
    });
    let check_ass1 = setInterval(()=>{
      if(query1?.length > 0){
        let assets_name:string = ""+ list_of_names[0].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query1.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass1);
      }
    },1);


    let query2:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[1], {responseType: "text"}).subscribe(data =>{
      query2 = data;
    });
    let check_ass2 = setInterval(()=>{
      if(query2?.length > 0){
        let assets_name:string = ""+ list_of_names[1].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query2.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass2);
      }
    },1);


    let query3:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[2], {responseType: "text"}).subscribe(data =>{
      query3 = data;
    });
    let check_ass3 = setInterval(()=>{
      if(query3?.length > 0){
        let assets_name:string = ""+ list_of_names[2].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query3.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass3);
      }
    },1);

    let query4:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[3], {responseType: "text"}).subscribe(data =>{
      query4 = data;
    });
    let check_ass4 = setInterval(()=>{
      if(query4?.length > 0){
        let assets_name:string = ""+ list_of_names[3].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query4.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass4);
      }
    },1);


    let query5:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[4], {responseType: "text"}).subscribe(data =>{
      query5 = data;
    });
    let check_ass5 = setInterval(()=>{
      if(query5?.length > 0){
        let assets_name:string = ""+ list_of_names[4].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query5.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass5);
      }
    },1);

    let query6:string = "";
    if(list_of_names.length > 0) this.connection.get(this.assets_path+list_of_names[5], {responseType: "text"}).subscribe(data =>{
      query6 = data;
    });
    let check_ass6 = setInterval(()=>{
      if(query6?.length > 0){
        let assets_name:string = ""+ list_of_names[5].split('.')?.at(0) as string ;
        let as:Assets = new Assets(assets_name, query6.split('\n'));
        this.list_of_assets.push(as);
        clearInterval(check_ass6);
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
}

class Assets{
  name:string;
  list:any[];
  constructor(name:string, list:any[]){
    this.name = name;
    this.list = list;
  }
}
