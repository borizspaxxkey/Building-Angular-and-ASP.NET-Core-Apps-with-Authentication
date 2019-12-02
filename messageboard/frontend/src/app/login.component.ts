import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({

  selector: 'login',
  template: `
  <mat-card>
        <mat-form-field>
            <input matInput placeholder="Email" type="email" [(ngModel)]="loginData.email">
        </mat-form-field>

        <mat-form-field>
            <input matInput placeholder="Password" type="password" [(ngModel)]="loginData.password">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="login()">Login</button>
  </mat-card>

  `,
  styles: [`
    .error {
    background-color: #fff0f0
  }
  `]
})
export class LoginComponent {

  loginData = {
    email: '',
    password:''
  }

  constructor(private fb: FormBuilder, private auth:AuthService) {

  }

  login() {
    this.auth.login(this.loginData)
  }
}

