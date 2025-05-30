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

  DEBUG:boolean = true;
  show_options:boolean = false;

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
  list_of_counters:any[] = [];
  current_fetched = 0;
  private list_of_assets:any[] = [];

  ngOnInit(){
    setInterval(()=>{
      this.timeMillis += 500;
    }, 500);
    this.level = this.ES.currentInfo().difficulty;
    //this.level = 1;
    console.log("Current level: "+this.level);
    if(this.level < 1 || this.level > 3 ) this.level = 1;
    let clev = 0;
    switch(this.level){
      case 1:
          clev = this.low_fetch;
          break;
      case 2:
          clev = this.mid_fetch;
          break;
      case 3:
          clev = this.high_fetch;
          break;
      default:
        console.log("Undefined level");
        break;
    }

    const fetch: Promise<any> = new Promise((res,rej) => {
      res(this.fetch_array(clev));
    }).then((res:any) => {
        let cicle = setInterval(()=>{
          if(this.current_fetched == clev){
            this.load_assets();
            this.prepare_class_ref(clev);
            clearInterval(cicle);
          }
        }, 10);
    });
  }

  checkContent(){
    let check:number = 0;
    let not_passed:boolean = false;
    for(let i=0;i<this.list_of_categories_tr.length;i++){
      check += this.list_of_categories_tr[i].length - 1;
    }
    if(check != 6){
      not_passed = true;
      if(this.DEBUG) console.log("too many items");
    }else{
      let gen_counter:number = 0;
      switch(this.level){
        case 1:
        case 2:
        case 3:
          for(let i=0;i<this.display_link.length;i++){
            for(let j=0;j<this.list_of_categories_tr.length;j++){
              if(this.list_of_categories_tr[j].includes(this.display_link[i])){
                let cname:string = this.list_of_categories[j];
                let obj:Assets = this.list_of_assets[this.display_obj[i]];
                if(cname == obj.name){
                  if(this.DEBUG) console.log("Object is in the right position");
                  gen_counter+=1;
                }
              }
            }
          }
          if(gen_counter != 6){
            not_passed = true;
          }
          break;
        default:
          console.log("Undefined check function related to the current level");
          break;
      }
    }

    if(not_passed){
      let cont = document.querySelectorAll(".counter");
      cont.forEach((c) => {
        c.classList.remove("actived");
      });
      let cat_len:number = this.list_of_categories_tr.length;
      let sc:any[] = [];
      this.errors+=1;

      for(let i=0;i<cat_len;i++){
        let s:string[] = [];
        s.push(this.list_of_categories_tr[i][0]);
        sc.push(s);
      }
      this.list_of_categories_tr = sc;
      for(let i=0;i<this.list_of_categories.length;i++){
          this.list_of_counters[i] = 0;
      }
      if(this.DEBUG) {
        console.log("Clear 'list_of_categories_tr' and reconstuct container logic");
        console.log("New container logic length: "+this.list_of_categories_tr.length);
      }
    }else{
      if(this.DEBUG) console.log("Congratulation you completed the exercise");
      this.ES.nextExercise(404, { errors: this.errors , time: this.timeMillis });
    }
  }

  skip_exercise(){
      /* this is a arbitrary number to indicate a skip case, this is not usable to track errors and such and may change in future backend architecture update */
      this.errors = -1;
      this.ES.nextExercise(404, { errors: this.errors , time: this.timeMillis });
  }

  prepare_class_ref(clev:number){
      for(let i=0;i<this.list_of_categories.length;i++){
        this.list_of_counters[i] = 0;
      }
      for(let i=0;i<this.list_of_categories.length;i++){
        let s:string[] = [];
        switch(this.list_of_categories[i]){
          case "car":
            s.push("Automobili");
            this.list_of_categories_tr.push(s);
            break;
          case "car_brands":
            s.push("Marche d'auto");
            this.list_of_categories_tr.push(s);
            break;
          case "clothes":
            s.push("Abiti");
            this.list_of_categories_tr.push(s);
            break;
          case "flowers":
            s.push("Fiori e Natura");
            this.list_of_categories_tr.push(s);
            break;
          case "fruits":
            s.push("Frutti");
            this.list_of_categories_tr.push(s);
            break;
          case "glasses":
            s.push("Occhiali");
            this.list_of_categories_tr.push(s);
            break;
          case "house":
            s.push("Case");
            this.list_of_categories_tr.push(s);
            break;
          case "instruments":
            s.push("Strumenti Musicali");
            this.list_of_categories_tr.push(s);
            break;
          case "keys":
            s.push("Chiavi");
            this.list_of_categories_tr.push(s);
            break;
          case "pen":
            s.push("Penne");
            this.list_of_categories_tr.push(s);
            break;
          case "tools":
            s.push("Attrezzi");
            this.list_of_categories_tr.push(s);
            break;
          default:
            console.log("Undefined reference");
            break;
        }
      }
    this.show_options = true;
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
        if(this.DEBUG) console.log("image: "+link);
        list_of_fetched_object.push(random_object);
      }
    }
    for(i=0;i<this.show_image;i++){
      if(this.display_link){
      }
    }
    if(this.DEBUG){
      console.log("Display links: "+this.display_link);
      console.log("Display relations: "+this.display_obj);
      console.log("Display relations index: "+this.display_obj_index);
      console.log("List of fetched categories: "+this.list_of_categories);
    }
  }

  fetch_array(n:number){
    let list_of_names:string[] = this.get_names(n);
    if(list_of_names.length > 0){
      for(let i=0;i<n;i++){
        this.get_assets(list_of_names[i]);
      }
    }
  }


  get_assets(name:string){
    const connect_status:Promise<any> = new Promise((res,rej) => {
      this.connection.get(this.assets_path+name, {responseType: "text"}).subscribe(data =>{
        res(data);
      });
    }).then((res)=>{
        let assets_name:string = ""+ name.split('.')?.at(0) as string ;
        var splitted_array:string[] = new String(res).split('\n');
        let as:Assets = new Assets(assets_name, splitted_array);
        this.current_fetched += 1;
        this.list_of_assets.push(as);
    });
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
    ev.dataTransfer.setData("text/html", ev.target.id);
  }

  drop(ev:any){
    ev.preventDefault();
    ev.target.classList.add("actived");
    let data = ev.dataTransfer.getData("text/html");
    let p = data.indexOf(' src="');
    let link:string = "";
    let end:boolean = false;
    for(let i=p+6;i<data.length && !end;i++){
      if(data[i] != '"'){
      link += data[i];
      }else{
        end = true;
      }
    }

    for(let i=0;i<this.list_of_categories_tr.length;i++){
      if(ev.target.innerHTML == this.list_of_categories_tr[i][0] && !this.list_of_categories_tr[i].includes(link)){
        this.list_of_categories_tr[i].push(link);
        this.list_of_counters[i] += 1;
        console.log(ev.target.innerHTML);
        if(this.DEBUG){
          console.log("link of dragged element: "+link);
          console.log("Current element counter: "+this.list_of_counters[i]);
        }
      }
    }
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
