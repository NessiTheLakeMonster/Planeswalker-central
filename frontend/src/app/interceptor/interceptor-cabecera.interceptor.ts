
import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorCabeceraInterceptor: HttpInterceptorFn = (req, next) => {
  let token = sessionStorage.getItem('token')
  
  if (req.params.has('auth') && token) {
    const request = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('x-token', token)
    })
    return next(request);
  } else {

    const request = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    })
    return next(request);
  }

};
