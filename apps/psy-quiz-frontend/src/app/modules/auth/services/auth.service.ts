import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthRestService } from './rest/auth-rest.service';

@Injectable()
export class AuthService {
  private token: string | null = null;
  public user: any;

  constructor(private authRestService: AuthRestService, private router: Router) {}

  // register(user: User): Observable<User> {
  //   return this.http.post<User>('/api/auth/register', user);
  // }

  public login(authUserDto: any): Observable<any> {
    return this.authRestService.login(authUserDto).pipe(
      tap((response: any) => {
        this.user = response.user;
        this.token = response.token;
        console.warn(this.user);
      })
    );
    // const response = await this.authRestService.login(authUserDto);
    // this.user = response.user;
    // console.warn(this.user);
    // this.setToken(response.token);
    // localStorage.setItem('permit', `${JSON.stringify(user)}`);
  }

  async register(): Promise<void> {
    // TODO: Добавить возможности регистрации и изменения/востановления пароля
  }

  async logout(): Promise<void> {
    this.user = null;
    this.removeToken();
    await this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth-token', token);
  }

  removeToken(): void {
    this.token = '';
    localStorage.removeItem('auth-token');
  }

  getToken(): string | null {
    this.token = localStorage.getItem('auth-token');
    return this.token;
  }

  async getUser(): Promise<any> {
    if (!this.user) {
      try {
        this.user = await this.authRestService.getUserByToken(this.getToken());
      } catch (e) {
        await this.logout();
      }
    }

    return this.user;
  }

  async isAuthenticated(): Promise<boolean> {
    await this.getUser();
    return !!this.user;
  }
}
