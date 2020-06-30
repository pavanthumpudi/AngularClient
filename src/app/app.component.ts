import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Blog';
  auth_id:any;
  constructor (public auth:AuthService) { }
   ngOnInit(): void {
    this.auth_id = this.auth.getUserId();
  }
}
