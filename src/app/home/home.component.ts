import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private ES: ExerciseService) { }

  startSession() {
    this.ES.startSession();
  }
  


}
