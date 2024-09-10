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

  public async logout(authUserDto: any): Promise<void> {
    return await this.http
      .post<any>(`${this.baseUrl}/logout`, authUserDto)
      .toPromise()
      .then((res) => {
        // return res as AuthResponseDto;
      });
  }

  public async register(authUserDto: any): Promise<void> {
    return await this.http
      .post<any>(`${this.baseUrl}/registration`, authUserDto)
      .toPromise()
      .then((res) => {
        // return res as AuthResponseDto;
      });
  }

  public async forgotPassword(authUserDto: any): Promise<void> {
    return await this.http
      .post<any>(`${this.baseUrl}/forgotPassword`, authUserDto)
      .toPromise()
      .then((res) => {
        // return res as AuthResponseDto;
      });
  }

  public async changePassword(authUserDto: any): Promise<void> {
    return await this.http
      .post<any>(`${this.baseUrl}/change-password`, authUserDto)
      .toPromise()
      .then((res) => {
        // return res as AuthResponseDto;
      });
  }

  public async confirm(authUserDto: any): Promise<void> {
    return await this.http
      .post<any>(`${this.baseUrl}/confirm`, authUserDto)
      .toPromise()
      .then((res) => {
        // return res as AuthResponseDto;
      });
  }

  public async getUserByToken(token: string | null): Promise<any> {
    return await this.http
      .post<any>(`${this.baseUrl}/by-token`, { token: token })
      .toPromise()
      .then((res) => {
        return res;
      });
  }
}
