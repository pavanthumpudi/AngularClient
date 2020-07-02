import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-blog-profile',
  templateUrl: './blog-profile.component.html',
  styleUrls: ['./blog-profile.component.sass']
})
export class BlogProfileComponent implements OnInit {
  user: any;

  constructor( private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile.user; // Set user
      
    });
  }

}
