import { Component } from '@angular/core';
import { WebService } from './web.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'user',
  template: `
      <mat-card class="card">
          <mat-form-field>
               <input matInput [(ngModel)]="model.firstName" placeholder="First Name">
          </mat-form-field>

          <mat-form-field>
               <input matInput [(ngModel)]="model.lastName" placeholder="Last Name">
          </mat-form-field>

          <button mat-raised-button color="primary" (click)="saveUser(model)">Save Changes</button>
      </mat-card>

  `
})
export class UserComponent {

  model = {
    firstName: '',
    lastName: ''
}

  constructor(private webService: WebService, private sb: MatSnackBar, private router: Router) {

  }

  ngOnInit() {
    this.webService.getUser().subscribe(response => {
      this.model.firstName = response['firstName'];
      this.model.lastName = response['lastName']
    });
  }
  saveUser(userData) {
    this.webService.saveUser(userData).subscribe(response => {
      this.sb.open('Username changed', 'close', { duration: 2000 });
      this.router.navigate(['/']);
    });
}

}
