import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
  MatCardFooter,
} from '@angular/material/card';
import {
  MatInput,
  MatInputModule,
  MatFormField,
} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { __await } from 'tslib';
import { start } from 'repl';
import { ExerciseService } from '../../exercise.service';

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
    NgIf,
  ],
  templateUrl: './es403.component.html',
  styleUrl: './es403.component.scss',
})
export class Es403Component implements OnInit {
  constructor(private ES: ExerciseService) {}
  private connection = inject(HttpClient);
  private dictionary: any[] = [];
  private inputSection: any;
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

  errors: number = 0;
  display: string = '';
  word_typed = '';
  image_link: string = '';

  /*
   *  Level: varable used to set the difficulty
   *  Default state: 0 ( easier );
   *
   */

  level = this.ES.currentInfo().difficulty * 3 - 1;

  /*
   * List of word used for the selection. The index of
   * the array rappresent the difficulty selected.
   *
   *   index 0: easier;
   *   index 1: medium;
   *   index 3: harder;
   *
   */

  private list_of_words: any[] = [];
  timeMillis = 0;

  ngOnInit() {
    this.connection
      .get('assets/exAssets/dizionario_immagini/dizionario_semplice.txt', {
        responseType: 'text',
        headers: new HttpHeaders({
          'Cache-Control': 'max-age=3600', // Cache for 1 hour
        }),
      })
      .subscribe((data) => {
        this.dictionary = data.split('\n');
        this.getWord();
        this.setWord();
      });

    this.connection
      .get('assets/exAssets/dizionario_immagini/dizionario_normale.txt', {
        responseType: 'text',
        headers: new HttpHeaders({
          'Cache-Control': 'max-age=3600', // Cache for 1 hour
        }),
      })
      .subscribe((data) => {
        this.dictionary = data.split('\n');
        this.getWord();
        this.setWord();
      });

    this.connection
      .get('assets/exAssets/dizionario_immagini/dizionario_difficile.txt', {
        responseType: 'text',
        headers: new HttpHeaders({
          'Cache-Control': 'max-age=3600', // Cache for 1 hour
        }),
      })
      .subscribe((data) => {
        this.dictionary = data.split('\n');
        this.getWord();
        this.setWord();
      });

    setInterval(() => {
      this.timeMillis += 100;
    }, 100);
  }

  checkContent() {
    if (this.display.toLowerCase() == this.word_typed.toLowerCase()) {
      this.current_state++;
    } else {
      this.errors += 1;
      alert("Hai sbagliato, riprova!")
    }
    if (this.current_state >= 2) {
      this.ES.nextExercise(403, { time: this.timeMillis, errors: this.errors });
    }
  }

  private getWord(): void {
    var index: number = 0;
    var line: any[] = [];
    var obj = {};
    while (true) {
      index = Math.floor(Math.random() * this.dictionary.length);
      line = this.dictionary.at(index).split(',');
      obj = {
        link: '' + line.at(0),
        word: '' + line.at(1),
      };
      this.list_of_words.push(obj); // Store parsed object in array
      return;
    }
  }

  setWord(): void {
    if (this.list_of_words.length > 0 && this.list_of_words[this.level]) {
      const wordObj = this.list_of_words[this.level];
      this.display = wordObj.word;
      this.image_link = wordObj.link;
      console.log(this.display);
    }
  }

  onKey(event: any) {
    this.word_typed = event.target.value;
  }
}
