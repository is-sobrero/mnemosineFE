import { Component } from '@angular/core';
import { NgxConfettiExplosionComponent } from 'ngx-confetti-explosion';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-risultati',
  standalone: true,
  imports: [
    NgxConfettiExplosionComponent,
    RouterLink,
    MatButton
  ],
  templateUrl: './risultati.component.html',
  styleUrl: './risultati.component.scss'
})
export class RisultatiComponent {
  celebrate() {

  }   
}
