import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatStepper, MatStep, MatStepperNext, MatStepContent, MatStepHeader, MatStepLabel, MatStepperIcon } from '@angular/material/stepper';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon} from '@angular/material/icon';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    MatStepper,
    MatStep,
    MatStepperNext,
    MatStepContent,
    MatStepHeader,
    MatStepLabel,
    NgFor,
    NgIf,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperIcon
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements AfterViewInit, OnInit {
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder
  ) { }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  @ViewChild('stepper') stepper!: MatStepper;
  exerciseInfo: any;
  sessionInfo: any;
  visible = false;


  ngOnInit(): void {
    //every 0.5 s check if the current exercise is completed
        //@ts-ignore
        const sessionInfo = JSON.parse(localStorage.getItem('SessionInfo'));
        this.sessionInfo = sessionInfo;
      //@ts-ignore  
        var exerciseInfo = JSON.parse(localStorage.getItem('ExerciseInfo'));
        this.exerciseInfo = exerciseInfo;
        //router should include esercizio/ID

        if(sessionInfo != null && exerciseInfo != null){
          this.visible = true;
        }

        setInterval(() => {
          //@ts-ignore
            //@ts-ignore
            const sessionInfo = JSON.parse(localStorage.getItem('SessionInfo'));
            if (sessionInfo == null) {
              this.visible = false;
              this.sessionInfo = null;
              return;
            } 
            if (sessionInfo != null && this.sessionInfo == null) {
              if (this.stepper) {
                this.stepper.reset();
              } else {
                console.error('Stepper is undefined');
              }
              this.visible = true;
              this.sessionInfo = sessionInfo;
            } else if (sessionInfo.id != this.sessionInfo.id) {
              if (this.stepper) {
                this.stepper.reset();
              } else {
                console.error('Stepper is undefined');
              }
              this.sessionInfo = sessionInfo;
            }
          //@ts-ignore  
            var exerciseInfo = JSON.parse(localStorage.getItem('ExerciseInfo'));
            this.exerciseInfo = exerciseInfo;
          }, 1000);

  }

  ngAfterViewInit(): void {
    setInterval(() => {
      if (this.exerciseInfo.length < this.sessionInfo.exercises.length) {
        this.stepper.selectedIndex = this.exerciseInfo.length;
      }
    }, 1000);
    if (this.exerciseInfo.length < this.sessionInfo.exercises.length) {
      this.stepper.selectedIndex = this.exerciseInfo.length;
      //set previous exercises as completed

    }
    



  }


}
