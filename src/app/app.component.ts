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
  auth_user:any;
  username: any;
  constructor (public auth:AuthService) { }
   ngOnInit(): void {
    this.auth_id = this.auth.getUserId();
    this.auth.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
      console.log(this.username);
    });
    
  }
}
