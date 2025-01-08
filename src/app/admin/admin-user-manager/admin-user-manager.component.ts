import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ApiService } from '../../api.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatRow, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatInput, MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-admin-user-manager',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIconModule,
    MatExpansionModule, 
    MatLabel,
    MatFormField,
    MatTableModule,
    MatCardContent,
    MatSelect,
    MatRow,
    MatOption,
    MatButton,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './admin-user-manager.component.html',
  styleUrl: './admin-user-manager.component.scss'
})
export class AdminUserManagerComponent implements OnInit {
  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {

   }

  sessions:any = [];
  displayedColumns: string[] = ['number', 'esercizio', 'errori', 'tempo'];

  ngOnInit(): void {
    this.api.get('admin/getUsers').subscribe((res: any) => {
      console.log(res);
      this.sessions = res;
    });

    //do the above every 2 seconds
    setInterval(() => {
      this.api.get('admin/getUsers').subscribe((res: any) => {
        console.log(res);
        this.sessions = res;
      });
    }, 5000);

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-add-user.html',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatFormField, MatLabel, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  userForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    private fb: FormBuilder,
    private api: ApiService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onUserFormSubmit() {
    this.api.post('admin/createUser', this.userForm.value).subscribe((res: any) => {
      console.log(res);
      if (res.message === 'User created successfully') {
        alert('Utente salvato e inviato!');
        this.dialogRef.close();
      }
    });
  }
}
