import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButton } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ExerciseService } from '../../exercise.service';

// Define and configure the Angular component
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
export class Es505Component implements OnInit {
  // Inject the ExerciseService for managing exercise-related operations
  constructor(private ES: ExerciseService) { }

  // Dependency injection for HttpClient to perform HTTP requests
  private connection = inject(HttpClient);
  
  // Arrays to hold dictionary words and dummy objects
  private dictionary: any[] = [];
  public dummy_container: any[] = [];

  // Variable to track the current state of the application
  current_state = 0;

  // Variables for error count, image link, time tracking, and quarter management
  errors: number = 0;
  image_link: string = "";
  timeMillis: number = 0;
  quarter: number = 0;

  // Dummy objects to be used in the application
  dummy_0: any = null;
  dummy_1: any = null;
  dummy_2: any = null;
  dummy_3: any = null;

  // Variable to set the difficulty level of the exercise
  level = 1;

  // List to store words for selection based on difficulty level
  private list_of_words: any[] = [];

  // Angular lifecycle hook for component initialization
  ngOnInit() {
    // Increment timeMillis every 500 milliseconds
    setInterval(() => {
      this.timeMillis += 500;
    }, 500);

    // Set the exercise difficulty level from ExerciseService
    this.level = this.ES.currentInfo().difficulty;
    console.log(this.level);

    // Validate the level; set to 1 if out of bounds
    if (this.level < 1 || this.level > 3) {
      this.level = 1;
    }

    // Fetch the appropriate dictionary based on the difficulty level
    switch (this.level) {
      case 1:
        this.connection.get("assets/exAssets/dizionario_immagini/dizionario_semplice.txt", { responseType: "text" }).subscribe(data => {
          this.dictionary = data.split("\n");
          this.getWord();
          this.setImage();
        });
        break;
      case 2:
        this.connection.get("assets/exAssets/dizionario_immagini/dizionario_normale.txt", { responseType: "text" }).subscribe(data => {
          this.dictionary = data.split("\n");
          this.getWord();
          this.setImage();
        });
        break;
      case 3:
        this.connection.get("assets/exAssets/dizionario_immagini/dizionario_difficile.txt", { responseType: "text" }).subscribe(data => {
          this.dictionary = data.split("\n");
          this.getWord();
          this.setImage();
        });
        break;
      default:
        console.log("Undefined level");
        break;
    }

    // Add dummy objects to the container
    this.dummy_container.push(this.dummy_0, this.dummy_1, this.dummy_2, this.dummy_3);
  }

  // Method to check the content of a selected dummy object
  checkContent(dummy_index: number) {
    console.log(this.quarter);

    // Check if the selected dummy object's quarter and link match
    if (this.dummy_container[dummy_index].quarter == this.quarter && this.image_link == this.dummy_container[dummy_index].link) {
      this.current_state = 1;
      this.ES.nextExercise(505, { errors: this.errors, time: this.timeMillis });
    } else {
      this.errors += 1;
    }
  }

  // Method to set images and associate them with dummy objects
  setImage() {
    // CSS classes for dummy objects
    const dummy_classes: string[] = [
      ".dummy_0",
      ".dummy_1",
      ".dummy_2",
      ".dummy_3",
    ];

    let dummy_quarter;
    let cached_dummy: any;
    console.log("here");

    // Initialize dummy objects with random quarters and associate them with DOM elements
    for (let i = 0; i < this.dummy_container.length; i += 1) {
      dummy_quarter = 1 + Math.floor(Math.random() * 3);
      cached_dummy = this.dummy_container[i];
      cached_dummy = new DummyObject("" + this.list_of_words.at(i), dummy_quarter);
      cached_dummy.setObj(document.querySelector(dummy_classes[i]));
      this.dummy_container[i] = cached_dummy;
      console.log(cached_dummy);
    }

    // Set graphics for each dummy object
    for (let i = 0; i < this.dummy_container.length; i += 1) {
      this.dummy_container[i]?.setGraphics();
    }

    // Randomly select a dummy object and assign its quarter to the cover element
    const rand = Math.floor(Math.random() * 4);
    this.quarter = this.dummy_container[rand]?.quarter;

    const cover: any = document.querySelector(".cover");
    switch (this.quarter) {
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

    // Set the image link for the selected dummy object
    this.image_link = this.dummy_container[rand]?.link;
  }

  // Method to randomly select words from the dictionary
  private getWord(): void {
    let index: number = 0;
    let line: any[] = [];
  
    // Randomly select four words from the dictionary and store them in the list_of_words
    for (let i = 0; i < 4; i++) {
      index = Math.floor(Math.random() * this.dictionary.length);
      line = this.dictionary.at(index).split(",");
      this.list_of_words.push(line.at(0));
    }
  }
}

// Class representing a dummy object with a link, quarter, and DOM element
class DummyObject {
  public link: string = "";
  public quarter: number = 0;
  public obj: any;

  constructor(link: string, quarter: number) {
    this.link = link;
    this.quarter = quarter;
  }

  // Method to associate a DOM element with the dummy object
  setObj(obj: any): void {
    this.obj = obj;
  }

  // Method to set the graphics of the dummy object based on its quarter
  setGraphics(): void {
    switch (this.quarter) {
      case 1:
        this.obj.style = "transform-origin:top left;transform:translate(0px, 0px)";
        break;
      case 2:
        this.obj.style = "transform-origin:top right;transform:translate(-50%, 0%)";
        break;
      case 3:
        this.obj.style = "transform-origin:bottom right;transform:translate(0%, -50%)";
        break;
      case 4:
        this.obj.style = "transform-origin:bottom left;transform:translate(-50%, -50%)";
        break;
      default:
        console.log("Unusable quarter value\n");
        break;
    }
  }
}
