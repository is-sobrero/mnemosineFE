import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
//Import header content title subtitle actions footer
import { MatCardHeader, MatCardContent, MatCardActions, MatCardTitle, MatCardSubtitle, MatCardFooter } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatDivider,
    MatProgressBar,
    MatButton,
    MatFormField,
    MatInput,
    FormsModule,
    MatCardHeader, MatCardActions, MatCardTitle, MatCardSubtitle, MatCardFooter, MatCardContent,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  constructor(
    private api: ApiService
  ) { }
  
  ngOnInit() {
  }
  
  username: string = '';
  password: string = '';

  login() {
    alert('Username: ' + this.username + ' Password: ' + this.password);
    this.api.post('login', {username: this.username, password: this.password}).subscribe(data => {
      //@ts-ignore
      alert(data.token);
    }
    );
  }
}
