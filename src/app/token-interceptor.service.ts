import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector:Injector) { }

  intercept(req, next) {
    if (req.url.search('covid') === -1 ) {
      let auth = this.injector.get(AuthService);
      if (auth.getToken()) {
        req = req.clone({
          setHeaders: {
            Authorization:`${auth.getToken()}`
          }
        })
      }
      
    }
    return next.handle(req)
  }
}
