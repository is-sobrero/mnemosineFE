import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ExerciseService } from '../../exercise.service';

@Component({
    selector: 'app-es105',
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
        CommonModule,
        MatInputModule,
        FormsModule
    ],
    templateUrl: './es105.component.html',
    styleUrls: ['./es105.component.scss']
})
export class Es105Component implements OnInit {
    livello = 0;
    immagine: string = '';
    rispostaCorretta: string = '';
    rispostaUtente = '';
    step = 1;
    timerImmagine: any;
    errori: number = 0;
    timeMillis: number = 0;

    // Array di oggetti immagine e domande
    immagini = [
        {
            immagine: 'assets/images_es105/livello1.png',
            domande: [
                { domanda: 'Con cosa gioca il cane?', risposta: 'palla' },
                { domanda: 'Di che colore è il cane?', risposta: 'arancione' },
                { domanda: 'Quanti cani ci sono?', risposta: '1' }
            ]
        },
        {
            immagine: 'assets/images_es105/livello2.png',
            domande: [
                { domanda: 'Qual\'è il colore del collare del gatto?', risposta: 'azzurro' },
                { domanda: 'Chi ha le strisce?', risposta: 'cane' },
                { domanda: 'Chi ha gli occhi marroni?', risposta: 'nessuno' }
            ]
        },
        {
            immagine: 'assets/images_es105/livello3.png',
            domande: [
                { domanda: 'Chi tiene la zamba sulla palla?', risposta: 'gatto' },
                { domanda: 'Di che colore è lo sfondo?', risposta: 'rosa' },
                { domanda: 'Quante zampe in totale hai visto?', risposta: '6' }
            ]
        }
    ];

    immagineCorrenteIndex = 0;
    domandaCorrenteIndex = 0;

    constructor(private ES: ExerciseService) { }

    ngOnInit(): void {
        this.livello = this.ES.currentInfo().difficulty;

        this.iniziaGioco();

        setInterval(() => {
            this.timeMillis += 100;
          }
          , 100);
    }

    iniziaGioco() {
        this.immagineCorrenteIndex = 0;
        this.domandaCorrenteIndex = 0;
        this.errori = 0;
        this.step = 1;
        this.mostraImmagine();
    }

    mostraImmagine() {
        this.step = 1;
        const immagineCorrente = this.immagini[this.livello];
        this.immagine = immagineCorrente.immagine;
        this.rispostaCorretta = immagineCorrente.domande[this.domandaCorrenteIndex].risposta;

        // Mostra l'immagine per 10 secondi
        this.timerImmagine = setTimeout(() => {
            this.step = 2;
        }, 10000);
    }

    stepSuccessivo() {
        if (this.step === 2) {
            this.verificaRisposta();
        }
    }

    verificaRisposta() {
        if (this.rispostaUtente.toLowerCase() === this.rispostaCorretta.toLowerCase()) {
            this.domandaCorrenteIndex++;
            if (this.domandaCorrenteIndex < this.immagini[this.livello].domande.length) {
                this.rispostaUtente = '';
                this.step = 2;
                this.rispostaCorretta = this.immagini[this.livello].domande[this.domandaCorrenteIndex].risposta;
            } else {
                this.step = 3; // Fine del gioco
                this.ES.nextExercise(105, {errors: this.errori, time: this.timeMillis});
            }
        } else {
            alert('Risposta errata. Riprova.');
            this.rispostaUtente = '';
            this.step = 1;
            this.errori++;
            this.mostraImmagine();
        }
    }

    getDomandaCorrente(): string {
        return this.immagini[this.livello].domande[this.domandaCorrenteIndex].domanda;
    }
}
