import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormField, MatHint, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-picker',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatHint,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatSuffix,
  ],
  templateUrl: './picker.component.html',
  styleUrl: './picker.component.scss',
})
export class PickerComponent {
  constructor(private router: Router) {}
  //take the routes avaialble in the picker component
  click(route: string) {
    //goto esercizio/101
    this.router.navigate(['esercizio', route]);
  }
}
