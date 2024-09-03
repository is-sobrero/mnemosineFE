import { Component, OnInit, inject } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {signal} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';




/* 
Il modulo component, che rappresenta il componente, è decorato con il decoratore @Component.

Include un selettore che serve  per identificare il componente in un template HTML.
Il selettore è il nome del componente, che è app-es101 in questo caso.

Il campo standalone: true indica che il componente è autonomo e non dipende da altri componenti.

Il campo imports: [] è un array che contiene i moduli che il componente richiede per funzionare correttamente.

Il campo templateUrl: './es101.component.html' è il percorso del file HTML del template del componente.
Il campo styleUrl: './es101.component.scss' è il percorso del file SCSS del componente.
*/

export interface Word {
  name: string;
}

@Component({
  selector: 'app-es101',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatButton,
    NgFor,
    NgIf,
    HttpClientModule,
    MatSelect,
    MatOption,
    MatLabel,
    MatFormField,
    MatInput, MatFormFieldModule, MatChipsModule, MatIconModule
  ],
  templateUrl: './es101.component.html',
  styleUrls: ['./es101.component.scss'],
})

//il componente in se, implementa "OnInit" che ci consente di poter eseguire del codice all'avvio del componente
export class Es101Component implements OnInit {
  //il set di variaibli + "l'iniezione" di HttpClient, che ci consente di scaricare il file txt
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly words = signal<Word[]>([]);
  readonly announcer = inject(LiveAnnouncer);
  randomWord: string = '';
  fullList: string[] = [];
  wordList: string[] = [];
  numParole: number[] = [4,6,8];
  step: number = 0;
  difficulty: number = 0;
  errors = 0;
  

  private http = inject(HttpClient);

  timeMillis = 0;

  //funzione che viene eseguita all'avvio del componente
  ngOnInit(): void {
    this.step = 0;
    // ogni 100 millisecondi incrementa il tempo
    setInterval(() => {
      this.timeMillis += 100;
    }, 100);

    // aggiorna numero parole in base alla difficolta    

  }

  nextStep() {
    this.step++;
    if(this.step == 3) {
      this.timeMillis = 0;
      this.checkErrors();
    }
  }

  // scarica il file txt e lo divide in un array di stringhe, le assegna random a randomWord e ne sceglie 5 a caso per la lista di parole
  generateWords(nWords: number) {
    this.http.get('assets/exAssets/dizionarioitaliano1000.txt', {
        responseType: 'text',
      }).subscribe((data) => {
        this.fullList = data.split('\n');
        this.randomWord = this.fullList[Math.floor(Math.random() * this.fullList.length)];
        for (var i = 0; i < nWords; i++) {
          var word = this.fullList[Math.floor(Math.random() * this.fullList.length)];
          //QUESTO WHILE SERVE A FAR SI CHE LE PAROLE SIANO LUNGHE ALMENO 3 LETTERE E NON CONTENGANO LA LETTERA "À"
          //filter è ò à ù
          while (word.length < 3 || word.includes('ò') || word.includes('à') || word.includes('ù')) {
            word = this.fullList[Math.floor(Math.random() * this.fullList.length)];
          }
          this.wordList.push(word.toLocaleUpperCase());
        }
      });
  }

  start() {
    this.step = 1;
    console.log("Difficolta: " + this.difficulty);
    this.generateWords(this.numParole[this.difficulty]);
    this.errors = this.numParole[this.difficulty];
    console.log(this.wordList);
  }
  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.words.update(words => [...words, {name: value.toUpperCase()}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Word): void {
    this.words.update(words => {
      const index = words.indexOf(fruit);
      if (index < 0) {
        return words;
      }

      words.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.name}`);
      return [...words];
    });
  }

  edit(word: Word, event: MatChipEditedEvent) {
    const value = event.value.trim();
    console.log(word.name, value);
    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(word);
      return;
    }

    // Edit existing fruit
    this.words.update(words => {
      const index = words.indexOf(word);
      if (index >= 0) {
        words[index].name = value;
        return [...words];
      }
      return words;
    });
  }

  checkErrors() {
    this.words.update(words => {
      const paroleInserite = words.map(word => word.name);
      console.log(paroleInserite);
      for (var i = 0; i < paroleInserite.length; i++) {
        for(var j = 0; j < this.wordList.length; j++) {
          console.log(paroleInserite[i], this.wordList[j]); 
          if (paroleInserite[i].trim() === this.wordList[j].trim()) {
            this.errors--;
            break;
          }
        }
      }
      return words;
    });
    console.log(this.errors);
  }
  

}
