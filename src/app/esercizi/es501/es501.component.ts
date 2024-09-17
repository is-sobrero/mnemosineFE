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

  /* enable debug info */
  debug:boolean = true;

/*

  canvas related propieties

*/

  canvas_width:number = 500;
  canvas_height:number = 500;
  canvas_depth:number = 100;

  scale_factor_3d:number = 70;

  /* max axes rotation allowed:

    0: rotate by x axes

    1: rotate by y axes

    2: rotate by z axes

    3: rotate by x and y

    4: rotate by y and z

    5: rotate by x and x

    6: rotate by x, y, z

    for more you need to update the switch case int the rotation matrix function
  
  */
  max_rotation_allowed_for_3d = 5;

  bg_color = "#303030a0";
  fg_color = "#101010";

  limit_bound:number = 100;
  random_cursor:number = 0;

    /* 
      structure for command list:

      # note: use the local variable random_x and random_y to apply position on execution time 

      easy [
        "command1();command2();command3() .... commandN()",   1st figure
        "command1();command2()"                               2nd figure
        "command1();"                                         3rd figure
      ]
    */

  level = 1;

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
    "cube = new Cube(random_x,random_y,random_z, scale_factor);cube = this.rotation_matrix(cube, rotation_factor, select_rotation);this.plane_projection(cube, 1);cube.pan(this.limit_bound, this.canvas_width-this.limit_bound, this.canvas_height-this.limit_bound,50);cube.stroke_vertex(this.cbx);",

    "piramid = new Piramid(random_x, random_y, random_z, scale_factor, 1);piramid = this.rotation_matrix(piramid, rotation_factor, select_rotation);this.plane_projection(piramid, 1);piramid.pan(this.limit_bound, this.canvas_width-this.limit_bound, this.canvas_height-this.limit_bound,50);piramid.stroke_vertex(this.cbx);",

    "cube_2 = new Cube(random_x,random_y,random_z*2, scale_factor);cube = this.rotation_matrix(cube_2, rotation_factor, select_rotation);this.plane_projection(cube_2, 0.5);cube_2.pan(this.limit_bound, this.canvas_width-this.limit_bound, this.canvas_height-this.limit_bound,50);cube_2.stroke_vertex(this.cbx);",

    "piramid_2 = new Piramid(random_x, random_y, random_z, scale_factor, 5);piramid_2 = this.rotation_matrix(piramid_2, rotation_factor, select_rotation);this.plane_projection(piramid_2, 0.5);piramid_2.pan(this.limit_bound, this.canvas_width-this.limit_bound, this.canvas_height-this.limit_bound,50);piramid_2.stroke_vertex(this.cbx);",

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
    this.cbx.lineWidth = "2"; 

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
    var scale = 100+Math.floor(Math.random()*100);

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

    if(this.debug){
      console.log("currento level 2 parameters: ");
      console.log("X -> "+random_x);
      console.log("Y -> "+random_y);
      console.log("X-scaled -> "+random_x_scaled);
      console.log("Y-scaled -> "+random_y_scaled);
      console.log("X-arc -> "+random_x_arc);
      console.log("Y-arc -> "+random_y_arc);
      console.log("angle: "+angle);
      console.log("scale: "+scale)
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
    var random_cursor = Math.floor(Math.random()*this.difficulty.at(1).length);

    this.cbx.clearRect(0,0,this.canvas_width,this.canvas_height);
    console.clear();

    /* position */
    var random_x = this.limit_bound+Math.floor((Math.random())*this.canvas_width-this.limit_bound);
    var random_y = this.limit_bound+Math.floor((Math.random())*this.canvas_height-this.limit_bound);
    var random_z = this.limit_bound+Math.floor(Math.random() * this.canvas_depth-this.limit_bound);

    /* scaling factor, rotation factor and selected rotation */
    var scale_factor = 80 + Math.floor(Math.random() * this.scale_factor_3d);
    var rotation_factor=  Math.floor(Math.random()*360);
    var select_rotation = Math.floor(Math.random()*(this.max_rotation_allowed_for_3d+1));


    if(this.debug){
      console.log("currento level 2 parameters: ");
      console.log("X -> "+random_x);
      console.log("Y -> "+random_y);
      console.log("Z -> "+random_z);
      console.log("rotation factor: "+rotation_factor);
      switch(select_rotation){
        case 0:
              console.log("rotation: rotate by x axes");
              break;
        case 1:
              console.log("rotation: rotate by y axes");
              break;
        case 2:
              console.log("rotation: rotate by z axes");
              break;
        case 3:
              console.log("rotation: rotate by x, y axes");
              break;
        case 4:
              console.log("rotation: rotate by y, z axes");
              break;
        case 5:
              console.log("rotation: rotate by x, z axes");
              break;
        case 6:
              console.log("rotation: rotate by x, y, z axes");
              break;
      }
    }

    var commands:string[] = this.difficulty.at(this.level)?.at(random_cursor)?.split(";");

    this.cbx.strokeStyle = this.bg_color;
    var cube = null;
    var cube_2 = null;
    var piramid_2 = null;
    var piramid = null;

    for(let i=0;i<commands.length;i++){
      eval(commands[i]);
    }


    /* creating and manipulating polygons */
  }

  private hard_generation(){

  }



  private plane_projection(cube:Object_3d, focal_lenght:number):void{
    var point:any[] = [];
    point = cube.getPoints();

    for(let i=0;i<point.length;i++){

      var x = point.at(i).x;
      var y = point.at(i).y;
      var z = point.at(i).z;

      /* a simple and primitive kind of plane projection */
      
      x = Math.floor((focal_lenght)*x-(z));
      y = Math.floor((focal_lenght)*y-(z));

      /* normalize points */

      point.at(i).x = x;
      point.at(i).y = y;
      point.at(i).z = 0;
    }

    cube.loadPoints(point);
  }


  private rotation_matrix(obj:Object_3d, rotation_factor:number, select_rotation:number):Object_3d{
    var points:any[] = [];

    /* push point into an array */

    points = obj.getPoints();

    switch(select_rotation){
      case 0:
            
            /* rotate by x axes */

            for(let i=0;i<points.length;i++){
              points.at(i).y = Math.floor(points.at(i).y*Math.cos(rotation_factor)+points.at(i).y*Math.sin(rotation_factor));
              points.at(i).z = Math.floor(points.at(i).z*(-Math.sin(rotation_factor))+points.at(i).z*Math.cos(rotation_factor));

            }

            break;
      case 1:


            /* rotate by y axes */

            for(let i=0;i<points.length;i++){
              points.at(i).x = Math.floor(points.at(i).x*Math.cos(rotation_factor)+points.at(i).x*(-Math.sin(rotation_factor)));
              points.at(i).z = Math.floor(points.at(i).z*Math.sin(rotation_factor)+points.at(i).z*Math.cos(rotation_factor));

            }

            break;

      case 2:

            /* rotate by z axes */

            for(let i=0;i<points.length;i++){
              points.at(i).x = Math.floor(points.at(i).x*Math.cos(rotation_factor)+points.at(i).x*Math.sin(rotation_factor));
              points.at(i).y = Math.floor(points.at(i).y*(-Math.sin(rotation_factor))+points.at(i).y*Math.cos(rotation_factor));

            }

            break;

    case 3:
            /* rotate by x and y */
          for(let i=0;i<points.length;i++){
            points.at(i).y = Math.floor(points.at(i).y*Math.cos(rotation_factor)+points.at(i).y*Math.sin(rotation_factor));
            points.at(i).z = Math.floor(points.at(i).z*(-Math.sin(rotation_factor))+points.at(i).z*Math.cos(rotation_factor));

          }

          for(let i=0;i<points.length;i++){
            points.at(i).x = Math.floor(points.at(i).x*Math.cos(rotation_factor)+points.at(i).x*(-Math.sin(rotation_factor)));
            points.at(i).z = Math.floor(points.at(i).z*Math.sin(rotation_factor)+points.at(i).z*Math.cos(rotation_factor));

          }
          break;
    case 4:
          /* rotate by y and z */

          for(let i=0;i<points.length;i++){
            points.at(i).x = Math.floor(points.at(i).x*Math.cos(rotation_factor)+points.at(i).x*(-Math.sin(rotation_factor)));
            points.at(i).z = Math.floor(points.at(i).z*Math.sin(rotation_factor)+points.at(i).z*Math.cos(rotation_factor));

          }

          for(let i=0;i<points.length;i++){
            points.at(i).x = Math.floor(points.at(i).x*Math.cos(rotation_factor)+points.at(i).x*Math.sin(rotation_factor));
            points.at(i).y = Math.floor(points.at(i).y*(-Math.sin(rotation_factor))+points.at(i).y*Math.cos(rotation_factor));

          }
          break;
            
    case 5:
          /* rotate by x and z */

          for(let i=0;i<points.length;i++){
            points.at(i).y = Math.floor(points.at(i).y*Math.cos(rotation_factor)+points.at(i).y*Math.sin(rotation_factor));
            points.at(i).z = Math.floor(points.at(i).z*(-Math.sin(rotation_factor))+points.at(i).z*Math.cos(rotation_factor));

          }


          for(let i=0;i<points.length;i++){
            points.at(i).x = Math.floor(points.at(i).x*Math.cos(rotation_factor)+points.at(i).x*Math.sin(rotation_factor));
            points.at(i).y = Math.floor(points.at(i).y*(-Math.sin(rotation_factor))+points.at(i).y*Math.cos(rotation_factor));

          }

          break;
    
      default:
            console.log("no rotation type provided! check your code");
            break;
    }

    /* push calculated point back in place */

    obj.loadPoints(points);

    return obj;
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

  public clone(point:Point):Point{
    return new Point(point.x,point.y,point.z);
  }
}


export class Object_3d{
  constructor(){}

  public getPoints():Point[]{
    var points:Point[] = [];

    return points;
  }
  public loadPoints(points:Point[]):void{}

  public stroke_vertex(cbx:any):void{}

  public pointToString(){}

  public pan_object(min:number,max:number, maxy:number){}

  public pan(min:number,max:number, maxy:number,cicle:number){}

}

export class Cube extends Object_3d{
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
    super();
    this.p1 = new Point(origin_x,origin_y, origin_z);
    this.p2 = new Point(origin_x+radius,origin_y, origin_z);
    this.p3 = new Point(origin_x+radius,origin_y+radius, origin_z);
    this.p4 = new Point(origin_x,origin_y+radius, origin_z);

    this.z1 = new Point(origin_x,origin_y, origin_z+radius);
    this.z2 = new Point(origin_x+radius,origin_y, origin_z+radius);
    this.z3 = new Point(origin_x+radius,origin_y+radius, origin_z+radius);
    this.z4 = new Point(origin_x,origin_y+radius, origin_z+radius);
  }

  
  override getPoints():Point[]{
    var points:Point[] = [];

    points.push(this.p1);
    points.push(this.p2);
    points.push(this.p3);
    points.push(this.p4);

    points.push(this.z1);
    points.push(this.z2);
    points.push(this.z3);
    points.push(this.z4);

    return points;
  }

  override loadPoints(points:Point[]):void{
    this.p1 = points.at(0) as Point;
    this.p2 = points.at(1) as Point;
    this.p3 = points.at(2) as Point;
    this.p4 = points.at(3) as Point;

    this.z1 = points.at(4) as Point;
    this.z2 = points.at(5) as Point;
    this.z3 = points.at(6) as Point;
    this.z4 = points.at(7) as Point;
  }

  override stroke_vertex(cbx:any): void {

    cbx.beginPath();
    cbx.moveTo(this.p1.x, this.p1.y);
    cbx.lineTo(this.p2.x,this.p2.y);
    cbx.lineTo(this.p3.x,this.p3.y);
    cbx.lineTo(this.p4.x,this.p4.y);
    cbx.lineTo(this.p1.x,this.p1.y);

    
    cbx.moveTo(this.z1.x,this.z1.y);
    cbx.lineTo(this.z2.x,this.z2.y);
    cbx.lineTo(this.z3.x,this.z3.y);
    cbx.lineTo(this.z4.x,this.z4.y);
    cbx.lineTo(this.z1.x,this.z1.y);
    

    cbx.moveTo(this.p1.x, this.p1.y);
    cbx.lineTo(this.z1.x, this.z1.y);

    cbx.moveTo(this.p2.x, this.p2.y);
    cbx.lineTo(this.z2.x, this.z2.y);

    cbx.moveTo(this.p3.x, this.p3.y);
    cbx.lineTo(this.z3.x, this.z3.y);

    cbx.moveTo(this.p4.x, this.p4.y);
    cbx.lineTo(this.z4.x, this.z4.y);

  }

  override pointToString():void{
    console.log("p1 -> x:"+this.p1.x+" y:"+this.p1.y);
    console.log("p2 -> x:"+this.p2.x+" y:"+this.p2.y);
    console.log("p3 -> x:"+this.p3.x+" y:"+this.p3.y);
    console.log("p4 -> x:"+this.p4.x+" y:"+this.p4.y);

    console.log("z1 -> x:"+this.z1.x+" y:"+this.z1.y);
    console.log("z2 -> x:"+this.z2.x+" y:"+this.z2.y);
    console.log("z3 -> x:"+this.z3.x+" y:"+this.z3.y);
    console.log("z4 -> x:"+this.z4.x+" y:"+this.z4.y);
  }

  /* function to center the object into the canvas */

  override pan_object(min:number,max:number, maxy:number):any{

    var end:boolean = false;
    var check_negative_x:number = 0;
    var check_negative_y:number = 0;
    var check_overflow_x:number = 0;
    var check_overflow_y:number = 0;
    var fix_count = 10;

    /* 
    
      How this function operate ( incomplete ):

      1 - identify the direction where the object overflow from the canvas 
      2 - then check for all the 4 possibility and operate for them

      (panning/operation)
      3 - pan by a fixed value ( ex 10 ) until all point would enter in the 
      equation: 0+limit_bound > px > c_width-limit_bound && 0+limit_bound > py > c_height-limit_bound
    
    
    */

    /* check for negative overflow by any of this points */
    if(this.p1.x < min || this.p2.x < min || this.p3.x < min || this.p4.x < min){
      check_negative_x++;
    }
    if(this.p1.y < min || this.p2.y < min || this.p3.y < min || this.p4.y < min){
      check_negative_y++;
    }

    if(this.z1.x < min || this.z2.x < min || this.z3.x < min || this.z4.x < min){
      check_negative_x++;
    }
    if(this.z1.y < min || this.z2.y < min || this.z3.y < min || this.z4.y < min){
      check_negative_y++;
    }

    /* check for positive width-bounds overflow by any of this points */

    if(this.p1.x > max || this.p2.x > max || this.p3.x > max || this.p4.x > max){
      check_overflow_x++;
    }
    if(this.p1.y > maxy || this.p2.y > maxy || this.p3.y > maxy || this.p4.y > maxy){
      check_overflow_y++;
    }

    if(this.z1.x > max || this.z2.x > max || this.z3.x > max || this.z4.x > max){
      check_overflow_x++;
    }
    if(this.z1.y > maxy || this.z2.y > maxy || this.z3.y > maxy || this.z4.y > maxy ){
      check_overflow_y++;
    }

    if(check_negative_x == 0 && check_negative_y == 0 && check_overflow_x == 0 && check_overflow_y == 0){
      return 0;
    }

    if(check_negative_x > 0){
      console.log("negative x");
      while(!end){
        if( this.p1.x < min || this.p1.x < min || this.p3.x < min || this.p4.x < min || 
            this.z1.x < min || this.z2.x < min || this.z3.x < min || this.z4.x < min){

          this.p1.x += fix_count;
          this.p2.x += fix_count;
          this.p3.x += fix_count;
          this.p4.x += fix_count;
          this.z1.x += fix_count;
          this.z2.x += fix_count;
          this.z3.x += fix_count;
          this.z4.x += fix_count;

        }else end = true;
      }
      return 1;
    }

    if(check_negative_y > 0){
      console.log("negative y");
      while(!end){
        if( this.p1.y < min || this.p1.y < min || this.p3.y < min || this.p4.y < min || 
            this.z1.y < min || this.z2.y < min || this.z3.y < min || this.z4.y < min){

          this.p1.y += fix_count;
          this.p2.y += fix_count;
          this.p3.y += fix_count;
          this.p4.y += fix_count;
          this.z1.y += fix_count;
          this.z2.y += fix_count;
          this.z3.y += fix_count;
          this.z4.y += fix_count;

        }else end = true;
      }
      return 1;
    }

    if(check_overflow_x > 0){
      console.log("overflow x");
      while(!end){
        if( this.p1.x > max || this.p1.x > max || this.p3.x > max || this.p4.x > max || 
            this.z1.x > max || this.z2.x > max || this.z3.x > max || this.z4.x > max){

          this.p1.x -= fix_count;
          this.p2.x -= fix_count;
          this.p3.x -= fix_count;
          this.p4.x -= fix_count;
          this.z1.x -= fix_count;
          this.z2.x -= fix_count;
          this.z3.x -= fix_count;
          this.z4.x -= fix_count;

        }else end = true;
      }
      return 1;
    }


    if(check_overflow_y > 0){
      console.log("overflow y");
      while(!end){
        if( this.p1.y > maxy || this.p1.y > maxy || this.p3.y > maxy || this.p4.y > maxy || 
            this.z1.y > maxy || this.z2.y > maxy || this.z3.y > maxy || this.z4.y > maxy){

          this.p1.y -= fix_count;
          this.p2.y -= fix_count;
          this.p3.y -= fix_count;
          this.p4.y -= fix_count;
          this.z1.y -= fix_count;
          this.z2.y -= fix_count;
          this.z3.y -= fix_count;
          this.z4.y -= fix_count;
        }else end = true;
      }
      return 1;
    }

    if(check_negative_x > 0 && check_negative_y > 0){
      console.log("negative x and y");
      while(!end){
        if( this.p1.x < min || this.p1.x < min || this.p3.x < min || this.p4.x < min || 
            this.z1.x < min || this.z2.x < min || this.z3.x < min || this.z4.x < min ||
            this.p1.y < min || this.p1.y < min || this.p3.y < min || this.p4.y < min || 
            this.z1.y < min || this.z2.y < min || this.z3.y < min || this.z4.y < min
        ){

          this.p1.x += fix_count;
          this.p2.x += fix_count;
          this.p3.x += fix_count;
          this.p4.x += fix_count;
          this.z1.x += fix_count;
          this.z2.x += fix_count;
          this.z3.x += fix_count;
          this.z4.x += fix_count;

          this.p1.y += fix_count;
          this.p2.y += fix_count;
          this.p3.y += fix_count;
          this.p4.y += fix_count;
          this.z1.y += fix_count;
          this.z2.y += fix_count;
          this.z3.y += fix_count;
          this.z4.y += fix_count;

        }else end = true;
      }
      return 1;
    }

    if(check_overflow_x > 0 && check_overflow_y > 0){
      console.log("overflow x and y");
      while(!end){
        if( this.p1.y > maxy || this.p1.y > maxy || this.p3.y > maxy || this.p4.y > maxy || 
            this.z1.y > maxy || this.z2.y > maxy || this.z3.y > maxy || this.z4.y > maxy ||
            this.p1.x > max || this.p1.x > max || this.p3.x > max || this.p4.x > max || 
            this.z1.x > max || this.z2.x > max || this.z3.x > max || this.z4.x > max
        ){

          this.p1.x -= fix_count;
          this.p2.x -= fix_count;
          this.p3.x -= fix_count;
          this.p4.x -= fix_count;
          this.z1.x -= fix_count;
          this.z2.x -= fix_count;
          this.z3.x -= fix_count;
          this.z4.x -= fix_count;
          this.p1.y -= fix_count;
          this.p2.y -= fix_count;
          this.p3.y -= fix_count;
          this.p4.y -= fix_count;
          this.z1.y -= fix_count;
          this.z2.y -= fix_count;
          this.z3.y -= fix_count;
          this.z4.y -= fix_count;
        }else end = true;
      }
      return 1;
    }
  }

  override pan(min:number,max:number, maxy:number, cicle:number){
    var end:boolean = false;
    var it = 0;
    while(!end && it < cicle){
      if(this.pan_object(min, max, maxy) == 0){
        end = true;
      }
      it+=1;
  }
}

}

export class Piramid extends Object_3d{
  /* base points */

  b1;
  b2;
  b3;
  b4;

  /* top point */
  t1;

  constructor(origin_x:number, origin_y:number, origin_z:number, scale:number, height_multiplier:number){
    super();
    this.b1 = new Point(origin_x,origin_y,origin_z);
    this.b2 = new Point(origin_x+scale,origin_y,origin_z);
    this.b4 = new Point(origin_x,origin_y,origin_z+scale);
    this.b3 = new Point(origin_x+scale,origin_y,origin_z+scale);
    this.t1 = new Point(origin_x+(scale/2), origin_y+scale * height_multiplier, origin_z+(scale/2));
  }

  override loadPoints(points:Point[]):void{
    this.b1 = points.at(0) as Point;
    this.b2 = points.at(1) as Point;
    this.b3 = points.at(2) as Point;
    this.b4 = points.at(3) as Point;
    this.t1 = points.at(4) as Point;
  }

  override getPoints():Point[]{
    var points:Point[] = [];

    points.push(this.b1);
    points.push(this.b2);
    points.push(this.b3);
    points.push(this.b4);
    points.push(this.t1);

    return points;
  }


  override stroke_vertex(cbx:any):void{
    
    cbx.beginPath();
    cbx.moveTo(this.b1.x, this.b1.y);
    cbx.lineTo(this.b2.x, this.b2.y);
    cbx.lineTo(this.b3.x, this.b3.y);
    cbx.lineTo(this.b4.x, this.b4.y);
    cbx.lineTo(this.b1.x, this.b1.y);

    cbx.moveTo(this.b1.x, this.b1.y);
    cbx.lineTo(this.t1.x, this.t1.y);

    cbx.moveTo(this.b2.x, this.b2.y);
    cbx.lineTo(this.t1.x, this.t1.y);

    cbx.moveTo(this.b3.x, this.b3.y);
    cbx.lineTo(this.t1.x, this.t1.y);

    cbx.moveTo(this.b4.x, this.b4.y);
    cbx.lineTo(this.t1.x, this.t1.y);
  }

  override pointToString():void{
    console.log("b1 -> x:"+this.b1.x+" y:"+this.b1.y);
    console.log("b2 -> x:"+this.b2.x+" y:"+this.b2.y);
    console.log("b3 -> x:"+this.b3.x+" y:"+this.b3.y);
    console.log("b4 -> x:"+this.b4.x+" y:"+this.b4.y);
    console.log("t1 -> x:"+this.t1.x+" y:"+this.t1.y);
  }

  override pan_object(min: number, max: number, maxy: number): any {
    var end:boolean = false;
    var check_negative_x:number = 0;
    var check_negative_y:number = 0;
    var check_overflow_x:number = 0;
    var check_overflow_y:number = 0;
    var fix_count = 10;

    if(this.b1.x < min || this.b2.x < min || this.b3.x < min || this.b4.x < min || this.t1.x < min){
      check_negative_x++;
    }
    if(this.b1.y < min || this.b2.y < min || this.b3.y < min || this.b4.y < min || this.t1.y < min){
      check_negative_y++;
    }

    if(this.b1.x > max || this.b2.x > max || this.b3.x > max || this.b4.x > max || this.t1.x > max){
      check_overflow_x++;
    }
    if(this.b1.y > maxy || this.b2.y > maxy || this.b3.y > maxy || this.b4.y > maxy || this.t1.y > maxy){
      check_overflow_y++;
    }

    if(check_negative_x == 0 && check_negative_y == 0 && check_overflow_x == 0 && check_overflow_y == 0){
      return 0;
    }

    if(check_negative_x > 0){
      console.log("negative x");
      while(!end){
        if(this.b1.x < min || this.b2.x < min || this.b3.x < min || this.b4.x < min || this.t1.x < min){
          this.b1.x += fix_count;
          this.b2.x += fix_count;
          this.b3.x += fix_count;
          this.b4.x += fix_count;
          this.t1.x += fix_count;
        }else end = true;
      }
      return 1;
    }

    if(check_negative_y > 0){
      console.log("negative y");
      while(!end){
        if(this.b1.y < min || this.b2.y < min || this.b3.y < min || this.b4.y < min || this.t1.y < min){
          this.b1.y += fix_count;
          this.b2.y += fix_count;
          this.b3.y += fix_count;
          this.b4.y += fix_count;
          this.t1.y += fix_count;
        }else end = true;
      }
      return 1;
    }

    if(check_overflow_x > 0){
      console.log("overflow x");
      while(!end){
        if(this.b1.x > max || this.b2.x > max  || this.b3.x > max  || this.b4.x > max  || this.t1.x > max ){
          this.b1.x -= fix_count;
          this.b2.x -= fix_count;
          this.b3.x -= fix_count;
          this.b4.x -= fix_count;
          this.t1.x -= fix_count;
        }else end = true;
      }
      return 1;
    }

    if(check_overflow_y > 0){
      console.log("overflow y");
      while(!end){
        if(this.b1.y > maxy || this.b2.y > maxy  || this.b3.y > maxy  || this.b4.y > maxy || this.t1.y > maxy){
          this.b1.y -= fix_count;
          this.b2.y -= fix_count;
          this.b3.y -= fix_count;
          this.b4.y -= fix_count;
          this.t1.y -= fix_count;
        }else end = true;
      }
      return 1;
    }

    if(check_negative_x > 0 && check_negative_y > 0){
      console.log("negative x and y");
      while(!end){
        if(this.b1.x < min || this.b2.x < min || this.b3.x < min || this.b4.x < min || this.t1.x < min ||
            this.b1.y < min || this.b2.y < min || this.b3.y < min || this.b4.y < min || this.t1.y < min
        ){
          this.b1.x += fix_count;
          this.b2.x += fix_count;
          this.b3.x += fix_count;
          this.b4.x += fix_count;
          this.t1.x += fix_count;

          this.b1.y += fix_count;
          this.b2.y += fix_count;
          this.b3.y += fix_count;
          this.b4.y += fix_count;
          this.t1.y += fix_count;
        }else end = true;
      }
      return 1;
    }

    if(check_overflow_x > 0 && check_overflow_y > 0){
      console.log("overflow x and y");
      while(!end){
        if( this.b1.x > max || this.b2.x > max  || this.b3.x > max  || this.b4.x > max  || this.t1.x > max ||
            this.b1.y > maxy || this.b2.y > maxy  || this.b3.y > maxy  || this.b4.y > maxy || this.t1.y > maxy
        ){
          this.b1.x -= fix_count;
          this.b2.x -= fix_count;
          this.b3.x -= fix_count;
          this.b4.x -= fix_count;
          this.t1.x -= fix_count;

          this.b1.y -= fix_count;
          this.b2.y -= fix_count;
          this.b3.y -= fix_count;
          this.b4.y -= fix_count;
          this.t1.y -= fix_count;
        }else end = true;
      }
      return 1;
    }
  }

  override pan(min:number,max:number, maxy:number, cicle:number){
    var end:boolean = false;
    var it = 0;
    while(!end && it < cicle){
      if(this.pan_object(min, max, maxy) == 0){
        end = true;
      }
      it+=1;
    }
  }
}