import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  private errorMessage: string = '';

  // constructor(private notificationService: NotificationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((e) => this.errorHandler(e)));
  }

  errorHandler(exception: any) {
    let message = 'There are some errors';

    if (exception instanceof HttpErrorResponse) {
      if (
        exception.error instanceof Blob &&
        (exception.error.type === 'application/json' || exception.error.type === 'application/problem+json')
      ) {
        return this.blobParse(exception);
      }

      message = this.getErrorMessage(exception);
    }

    this.performAction(message);

    return throwError(() => exception);
  }

  private getErrorMessage(exception: HttpErrorResponse): string {
    let message = '';

    if (exception.status === 0 && exception.error instanceof ProgressEvent) {
      // message = translate('common.error.connection');
      message = 'Ошибка соединения';
    } else {
      switch (exception.status) {
        case HttpStatusCode.BadRequest:
        case HttpStatusCode.Unauthorized:
        case HttpStatusCode.NotFound:
        case HttpStatusCode.RequestTimeout:
        case HttpStatusCode.Forbidden:
        case HttpStatusCode.InternalServerError:
          // message = translate(`common.error.${exception.status}`);
          message = `ошибка ${exception.status}`;
          break;
        default:
          // message = translate('common.error.other');
          message = 'Неизвестная ошибка';
      }
    }
    return `${message}: `;
  }

  private performAction(
    message = 'There are some errors',
    // messageType = NotificationType.Error,
    displayTime?: number
  ): void {
    console.error(message);
    // this.notificationService.notification(message, messageType, displayTime);
  }

  private blobParse(exception: HttpErrorResponse): Promise<any> {
    const message = this.getErrorMessage(exception);

    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (ev: Event) => {
        try {
          const errmsg = JSON.parse((<any>ev.target).result);
          const errorMessage = errmsg.message || errmsg.title || errmsg.errors?.Message || errmsg.errors?.Message;
          const innerError = errmsg.errors.InnerError ? this.getInnerError(errmsg.errors) : errorMessage;
          this.performAction(`${message}${innerError}`);

          reject(
            new HttpErrorResponse({
              error: exception.error,
              headers: exception.headers,
              status: exception.status,
              statusText: exception.statusText,
              url: exception.url!
            })
          );
        } catch (er) {
          this.performAction(message);
          reject(exception);
        }
      };

      reader.onerror = (e) => {
        this.performAction(message);
        reject(exception);
      };

      reader.readAsText(exception.error);
    });
  }

  private getInnerError(errors: any): string {
    if (errors.InnerError) {
      this.errorMessage += '\t\t' + errors.InnerError.Message;
      this.getInnerError(errors.InnerError);
    }
    return this.errorMessage;
  }
}
