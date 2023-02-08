// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import {TokenService} from "./token.service";
//
// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//
//   constructor(private tokenservice:TokenService) {}
//
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//
//     request=request.clone({
//       setHeaders:{
//         Authorization:`Bearer ${this.tokenservice.getToken()}`
//       }
//     })
//     return next.handle(request);
//   }
// }
