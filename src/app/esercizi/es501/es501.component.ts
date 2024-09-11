import { Component, OnInit, inject } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { MatButton } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-es501',
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
  templateUrl: './es501.component.html',
  styleUrl: './es501.component.scss'
})
export class Es501Component implements OnInit{
  private ES:any;
  private canvas_background:any;
  private canvas_foreground:any;
  private cbx:any = null;
  private cfx:any = null;

  constructor(ES:ExerciseService){}

  /*
  *
  *   Current state variable.
  *   This variable control the state of the application 
  *
  * 
  */


  /* 
   *  variable used to manage the I/O system
   *
  */
  

  errors:number = 0;
  points:number = 0;
  current_obj:any;
  automatic:boolean = true;
  private random:boolean = true;

/*

  canvas related propieties

*/

  canvas_width:number = 400;
  canvas_height:number = 400;
  canvas_depth:number = 200;

  scale_factor_3d:number = 200;

  /* max axes rotation allowed:

    0: rotate by x axes

    1: rotate by y axes

    2: rotate by z axes

    for more you need to update the switch case int the rotation matrix function
  
  */
  max_rotation_allowed_for_3d = 2;

  bg_color = "#303030a0";
  fg_color = "#101010";

  limit_bound:number = 30;
  random_cursor:number = 0;

  //angle = 30;
  //scale = 60;           /* these variable are here only for showcase */
  //random_x = 0;
  //random_y = 0;


    /* 
      structure for command list:

      # note: use the local variable random_x and random_y to apply position on execution time 

      easy [
        "command1();command2();command3() .... commandN()",   1st figure
        "command1();command2()"                               2nd figure
        "command1();"                                         3rd figure
      ]
    */


 /*
  *  Level: varable used to set the difficulty
  *  Default state: 0 ( easier );
  *
  */

  level = 0;

  private easy_random:string[] = [
      "moveTo(random_x,random_y);\
       lineTo(random_x_arc,random_y_arc);\
       lineTo(random_x_arc, random_y_arc);\
       lineTo(random_x_scaled, random_y);\
       lineTo(random_x,random_y)",

      "moveTo(random_x_scaled,random_y);\
       lineTo(random_x,random_y_scaled);\
       lineTo(random_x, random_y_arc);\
       lineTo(random_x_arc,random_y_arc);\
       lineTo(random_x_arc,random_y)",

       "arc(random_x_arc,random_y, radius, 0, Math.PI)",

       "arc(random_x_scaled,random_y_arc, radius, 0, (3/2)*Math.PI)",

       "moveTo(random_x_scaled,random_y);\
       lineTo(random_x,random_y);\
       lineTo(random_x_arc, random_y_scaled);\
       lineTo(random_x,random_y);\
       lineTo(random_x,random_y)",

       "moveTo(random_x,random_y_scaled);\
       lineTo(random_x,random_y);\
       lineTo(random_x_arc, random_y_arc);\
       lineTo(random_x_scaled,random_y_scaled);\
       lineTo(random_x_arc,random_y);\
       lineTo(random_x_scaled,random_y);\
       lineTo(random_x,random_y)",

  ]
  private medium_random:string[] = [

  ]
  private hard_random:string[] = [
    "",
  ];

  private easy:string[] = [""];
  private medium:string[] = [""];
  private hard:string[] = [""];

  private difficulty:any[] = [];

  ngOnInit(){
    /* set up the level of difficulty */
    if(this.random){
      this.difficulty.push(this.easy_random);
      this.difficulty.push(this.medium_random);
      this.difficulty.push(this.hard_random);
    }else{
      this.difficulty.push(this.easy);
      this.difficulty.push(this.medium);
      this.difficulty.push(this.hard);
    }


    this.canvas_background = document.getElementById("canvas_bg");
    this.canvas_foreground = document.getElementById("canvas_fg");
  

    if(this.canvas_background?.getContext){
      this.cbx = this.canvas_background?.getContext("2d");
    }
    if(this.canvas_foreground?.getContext){
      this.cfx = this.canvas_foreground?.getContext("2d");
    }

    this.beginDrawing();
  }

  checkContent(){
    let res = this.checkCanvasDrawing();

    if(res == 2){
      this.ES.nextExercise(501, {error:this.errors, points:this.points});
    }
    if(this.errors > 3){
      this.ES.nextExercise(501, {error:this.errors, points:this.points});
    }
    return;
  }

  checkCanvasDrawing():number{
    let status  = 0; /* status variable: 1 = correct; 2 = wrong */

    /* switch between automatic check and operator-related check */
    if(this.automatic){
      let padding = 0 /* range where a painting would be considered valid */
  
      /* 
  
          check if what the patient have drawn correspond with what is displayed 
          within a padding of N pixels ( could be related with diffìculty level )
      
      
      */
    }

    return status;
  }

  beginDrawing():void{

    /* generate random coordinates */

    this.cbx.beginPath();   

    switch(this.level){
      case 0:
            this.easy_generation();
            break;
      case 1:
            this.medium_generation();
            break;
      case 3:
            this.hard_generation();
            break;
    }

    this.cbx.stroke();

    /*

      Prepare the foreground for drawing
    
    */

    this.cfx.beginPath();
    this.cfx.strokeStyle = this.fg_color;
    this.cfx.stroke();
  }

  private easy_generation(){

    var random_x = Math.floor((Math.random())*this.canvas_width/2);
    var random_y = Math.floor((Math.random())*this.canvas_height/2);
   
    var angle = Math.floor(Math.random()*60);
    var scale = 80+Math.floor(Math.random()*100);

    var random_x_scaled = random_x+scale;
    var random_y_scaled = random_y+scale;

    var random_x_arc = random_x*Math.cos(angle);
    var random_y_arc = random_y*Math.sin(angle);

    var radius = scale;

    /* get index of random figure */

    this.random_cursor = Math.floor(Math.random()*this.difficulty.at(this.level)?.length);

    // this.random_cursor = 5; for testing figures
    
    /* bounds check */

    if(random_x > this.canvas_width-this.limit_bound){
      random_x = this.canvas_width-this.limit_bound;
    }else if(random_x < this.limit_bound){
      random_x = this.limit_bound;
    }

    if(random_y > this.canvas_height-this.limit_bound){
      random_y = this.canvas_height-this.limit_bound;
    }else if(random_y < this.limit_bound){
      random_y = this.limit_bound;
    }

    if(random_x_scaled > this.canvas_width-this.limit_bound){
      random_x_scaled = this.canvas_width-this.limit_bound;
    }else if(random_x_scaled < this.limit_bound){
      random_x_scaled = this.limit_bound;
    }

    if(random_y_scaled > this.canvas_height-this.limit_bound){
      random_y_scaled = this.canvas_height-this.limit_bound;
    }else if(random_y_scaled < this.limit_bound){
      random_y_scaled = this.limit_bound;
    }

    if(random_x_arc > this.canvas_width-this.limit_bound){
      random_x_arc = this.canvas_width-this.limit_bound;
    }else if(random_x_arc < this.limit_bound){
      random_x_arc = this.limit_bound;
    }

    if(random_y_arc > this.canvas_height-this.limit_bound){
      random_y_arc = this.canvas_height-this.limit_bound;
    }else if(random_y_arc < this.limit_bound){
      random_y_arc = this.limit_bound;
    }

    /* get js commands */

    var commands:string[] = this.difficulty.at(this.level)?.at(this.random_cursor)?.split(";");



    this.cbx.strokeStyle = this.bg_color;
    
    for(let i=0;i<commands.length;i++){
      console.log(commands[i]);
      eval("this.cbx."+commands[i]);
    }
    
  }

  private medium_generation(){
    var random_x = Math.floor((Math.random())*this.canvas_width/2);
    var random_y = Math.floor((Math.random())*this.canvas_height/2);
    var random_z = Math.floor(Math.random() * this.canvas_depth);
    var scale_factor = Math.floor(Math.random() * this.scale_factor_3d);
    var rotation_factor=  Math.floor(Math.random()*60);
    var select_rotation = Math.floor(Math.random()*this.max_rotation_allowed_for_3d);


    if(random_x > this.canvas_width-this.limit_bound){
      random_x = this.canvas_width-this.limit_bound;
    }else if(random_x < this.limit_bound){
      random_x = this.limit_bound;
    }

    if(random_y > this.canvas_height-this.limit_bound){
      random_y = this.canvas_height-this.limit_bound;
    }else if(random_y < this.limit_bound){
      random_y = this.limit_bound;
    }

    if(random_z > this.canvas_height-this.limit_bound){
      random_z = this.canvas_depth-this.limit_bound;
    }else if(random_z < this.limit_bound){
      random_z = this.limit_bound;
    }

    var cube = new Cube(random_x,random_y,random_z, scale_factor);
    cube =this.rotation_matrix(cube, rotation_factor, select_rotation);

    var points = this.plane_projection(cube);


  }

  private hard_generation(){

  }



  private plane_projection(cube:Cube):Point[]{
    var point:Point[] = [];


    return point;
  }


  private rotation_matrix(cube:Cube, rotation_factor:number, select_rotation:number):Cube{
    var points:any[] = [];

    /* push point into an array */

    if(!(select_rotation > 0 && select_rotation < this.max_rotation_allowed_for_3d)){
      return cube;
    }

    points.push(cube.p1);
    points.push(cube.p2);
    points.push(cube.p3);
    points.push(cube.p4);
    points.push(cube.z1);
    points.push(cube.z2);
    points.push(cube.z3);
    points.push(cube.z4);

    switch(select_rotation){
      case 0:
            
            /* rotate by x axes */

            for(let i=0;i<points.length;i++){
              points.at(i).y = points.at(i).y*Math.cos(rotation_factor)+points.at(i).y*Math.sin(rotation_factor);
              points.at(i).z = points.at(i).z*(-Math.sin(rotation_factor))+points.at(i).z*Math.cos(rotation_factor);
            }

            break;
      case 1:


            /* rotate by y axes */

            for(let i=0;i<points.length;i++){
              points.at(i).x = points.at(i).x*Math.cos(rotation_factor)+points.at(i).x*(-Math.sin(rotation_factor));
              points.at(i).z = points.at(i).z*Math.sin(rotation_factor)+points.at(i).z*Math.cos(rotation_factor);
            }

            break;

      case 2:

            /* rotate by z axes */

            for(let i=0;i<points.length;i++){
              points.at(i).x = points.at(i).x*Math.cos(rotation_factor)+points.at(i).x*Math.sin(rotation_factor);
              points.at(i).y = points.at(i).y*(-Math.sin(rotation_factor))+points.at(i).y*Math.cos(rotation_factor);
            }

            break;
      default:
            console.log("no rotation type provided! check your code");
            break;
    }

    /* push calculated point back in place */

    cube.p1 = points.at(0);
    cube.p2 = points.at(1);
    cube.p3 = points.at(2);
    cube.p4 = points.at(3);
    cube.z1 = points.at(4);
    cube.z2 = points.at(5);
    cube.z3 = points.at(6);
    cube.z4 = points.at(7);

    return cube;
  }
}


export class Point{
  x:number = 0;
  y:number = 0;
  z:number = 0;

  constructor(x:number,y:number,z:number){
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Cube{
  /* from plane */

  p1;
  p2;
  p3;
  p4;

  /* back plane */

  z1;
  z2;
  z3;
  z4;

  constructor(origin_x:number, origin_y:number, origin_z:number, radius:number){
    this.p1 = new Point(origin_x-radius,origin_y+radius, origin_z);
    this.p2 = new Point(origin_x+radius,origin_y-radius, origin_z);
    this.p3 = new Point(origin_x+radius,origin_y+radius, origin_z);
    this.p4 = new Point(origin_x-radius,origin_y-radius, origin_z);

    this.z1 = new Point(origin_x-radius,origin_y+radius, origin_z+radius);
    this.z2 = new Point(origin_x+radius,origin_y-radius, origin_z+radius);
    this.z3 = new Point(origin_x+radius,origin_y+radius, origin_z+radius);
    this.z4 = new Point(origin_x-radius,origin_y-radius, origin_z+radius);
  }

}