import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(BaseAuthService) private auth: BaseAuthService, private transloco: TranslocoService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isLoggedIn() && !req.url.includes(this.auth.updateTokenEndpoint)) {
      req = this.getRequestWithAuthHeader(req, this.auth.getJwtToken()!);
    }

    let localeReq: HttpRequest<unknown> | undefined;
    if (req.url.includes('signin') || req.url.includes('signup')) {
      localeReq = req.clone({
        params: req.params.set(
          'locale',
          this.transloco.getActiveLang() === 'ru' ? SupportedLocale.Ru : SupportedLocale.En
        )
      });
    }

    return next
      .handle(localeReq || req)
      .pipe(catchError((error: HttpErrorResponse) => this.handleAuthError(error, localeReq || req, next)));
  }

  private handleAuthError(
    error: HttpErrorResponse,
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (error.status === 401) {
      return this.handleExpiredTokenError(request, next);
    }

    return throwError(() => error);
  }

  private handleExpiredTokenError(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.auth.isUpdatingToken) {
      return this.auth
        .updateToken()
        .pipe(switchMap((tokenDto) => next.handle(this.getRequestWithAuthHeader(request, tokenDto.jwt!))));
    }

    return this.auth.updateJwtTokenSubject$.pipe(
      filter((jwtToken) => !!jwtToken),
      take(1),
      switchMap((jwtToken) => next.handle(this.getRequestWithAuthHeader(request, jwtToken!)))
    );
  }

  private getRequestWithAuthHeader(request: HttpRequest<unknown>, bearerToken: string): HttpRequest<unknown> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${bearerToken}`)
    });
  }
}
