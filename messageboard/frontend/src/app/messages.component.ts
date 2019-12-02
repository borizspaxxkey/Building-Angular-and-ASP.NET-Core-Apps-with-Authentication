import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'messages',
  template: `
        <div *ngFor="let message of webService.messages | async">
          <mat-card class="card">
              <mat-card-title [routerLink]="['/messages', message.owner]"  style="cursor: pointer"> {{message.owner}}</mat-card-title>
            <mat-card-content>
                {{message.text}}
            </mat-card-content>
          </mat-card>
        </div>
  `
})
export class MessagesComponent implements OnInit {

  constructor(private webService: WebService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    const name = this.route.snapshot.params.name;
    this.webService.getMessages(name);
    this.webService.getUser().subscribe();
  }
}
