import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, from } from 'rxjs';

@Injectable()
export class AuthRestService {
  private baseUrl = 'http://localhost:5002/api/auth';

  constructor(private http: HttpClient) {}

  // public async login(authUserDto: any): Promise<any> {
  public login(authUserDto: any): Observable<any> {
    return from(this.http.post(`${this.baseUrl}/login`, authUserDto));
    // return new Promise<any>((ok, fail) => {
    //   const sub = new Subscription();

    //   sub.add(
    //     this.http.post(`${this.baseUrl}/login`, authUserDto).subscribe(
    //       (res) => {
    //         if (sub) {
    //           sub.unsubscribe();
    //         }
    //         ok(res);
    //       },
    //       (error) => {
    //         if (sub) {
    //           sub.unsubscribe();
    //         }
    //         fail(error);
    //       }
    //     )
    //   );
    // });
  }

  public logout(authUserDto: any): Observable<void> {
    return from(this.http
      .post<any>(`${this.baseUrl}/logout`, authUserDto))
  }

  public register(authUserDto: any): Observable<void> {
    return from(this.http
      .post<any>(`${this.baseUrl}/registration`, authUserDto))
  }

  public forgotPassword(authUserDto: any): Observable<void> {
    return from(this.http
      .post<any>(`${this.baseUrl}/forgotPassword`, authUserDto))
  }

  public changePassword(authUserDto: any): Observable<void> {
    return from(this.http
      .post<any>(`${this.baseUrl}/change-password`, authUserDto));
  }

  public confirm(authUserDto: any): Observable<void> {
    return from(this.http
      .post<any>(`${this.baseUrl}/confirm`, authUserDto))
  }

  public getUserByToken(token: string | null): Observable<any> {
    return from(this.http.post<any>(`${this.baseUrl}/by-token`, { token: token }));
  }
}
