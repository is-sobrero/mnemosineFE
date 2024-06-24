import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

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
    MatButton
  ],
  templateUrl: './es101.component.html',
  styleUrl: './es101.component.scss'
})
export class Es101Component {

}
