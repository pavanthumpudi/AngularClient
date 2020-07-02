import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://127.0.0.1:8080';
  
  constructor(private http:HttpClient) { }

  getAllBlogs() :Observable<any>{
   // this.createAuthenticationHeaders(); // Create headers
    return this.http.get(`${this.baseUrl}/blogs/allBlogs`);
  }
  newBlog(blog) :Observable<any>{
    return this.http.post(`${this.baseUrl}/blogs/newBlog`, blog);
  }
  likeBlog(id): Observable<any>  {
    const blogData = { id: id };
    return this.http.put(`${this.baseUrl}/blogs/likeBlog`, blogData);
  }
  postComment(id, comment): Observable<any> {
    // Create blogData to pass to backend
    const blogData = {
      id: id,
      comment: comment
    }
    return this.http.post(`${this.baseUrl}/blogs/comment`, blogData);
  }
  getSingleBlog(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/blogs/singleBlog/` + id);
  }
  editBlog(blog): Observable<any> {
    return this.http.put(`${this.baseUrl}/blogs/updateBlog/`, blog);
  }
}
