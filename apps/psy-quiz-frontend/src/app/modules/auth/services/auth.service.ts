import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthRestService } from './rest/auth-rest.service';

@Injectable()
export class AuthService {
  private token: string | null = null;
  public user: any;
  // protected tokenDto;
  private readonly tokenProjectIdKey = 'token-project-id';
  protected readonly jwtTokenKey = 'jwt-token';
  protected readonly refreshTokenKey = 'refresh-token';

  constructor(private authRestService: AuthRestService, private router: Router) {}

  // register(user: User): Observable<User> {
  //   return this.http.post<User>('/api/auth/register', user);
  // }

  public login(authUserDto: any): Observable<any> {
    return this.authRestService.login(authUserDto).pipe(
      tap((response: any) => {
        this.user = response.data.user;
        // this.token = response.data.token;
        console.warn('login');
        this.setToken(response.data.token);
        console.warn(this.user);
      })
    );
    // const response = await this.authRestService.login(authUserDto);
    // this.user = response.user;
    // console.warn(this.user);
    // this.setToken(response.token);
    // localStorage.setItem('permit', `${JSON.stringify(user)}`);
  }

  register(): Observable<any> {
    return of(void 0);
    // TODO: Добавить возможности регистрации и изменения/востановления пароля
  }

  logout(): Observable<void> {
    return this.authRestService.logout(this.user).pipe(
      tap(() => {
        this.user = null;
        this.removeToken();
        this.router.navigate(['/login']);
      })
    );
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.jwtTokenKey, token);
    console.warn('save tocken');
  }

  removeToken(): void {
    this.token = '';
    localStorage.removeItem(this.jwtTokenKey);
  }

  getToken(): string | null {
    this.token = localStorage.getItem(this.jwtTokenKey);
    return this.token;
  }

  getUser(): Observable<any> {
    debugger;
    if (!this.user) {
      try {
        return this.authRestService.getUserByToken(this.getToken()).pipe(
          tap((data) => {
            this.user = data.data;
          })
        );
      } catch (e) {
        return this.logout();
      }
    }

    return of(this.user);
  }

  public isLoggedIn(projectId?: string): boolean {
    return !!this.getJwtToken(projectId);
  }

  async isAuthenticated(): Promise<boolean> {
    await this.getUser();
    return !!this.user;
  }

  public getJwtToken(projectId?: string): string | undefined {
    // if (projectId && sessionStorage.getItem(this.tokenProjectIdKey) !== projectId) {
    //   return undefined;
    // }

    this.token = localStorage.getItem(this.jwtTokenKey) || '';
    if (!this.token) {
      this.token = localStorage.getItem(this.jwtTokenKey) || '';
    }
    return this.token;
    // if (!this.tokenDto.jwt) {
    //   this.tokenDto.jwt = localStorage.getItem(this.jwtTokenKey) || '';
    // }

    // return this.tokenDto.jwt;
  }

  private resetUser(skipRedirect: boolean = false): void {
    this.removeTokens();
    this.setUser(null);
    if (skipRedirect) return;
    this.router.navigateByUrl('/main');
  }

  private setTokens(jwt: string, refresh: string, projectId: string): void {
    this.token = jwt;
    // this.tokenDto.jwt = jwt;
    // this.tokenDto.refresh = refresh;
    // localStorage.setItem(this.jwtTokenKey, jwt);
    localStorage.setItem(this.tokenProjectIdKey, projectId);
    // localStorage.setItem(this.refreshTokenKey, refresh);
  }

  public removeTokens(): void {
    this.token = '';
    // this.tokenDto.jwt = '';
    // this.tokenDto.refresh = '';
    // localStorage.removeItem(this.jwtTokenKey);
    localStorage.removeItem(this.tokenProjectIdKey);
    // localStorage.removeItem(this.refreshTokenKey);
  }

  // public changePassword(oldPassword: string, newPassword: string): Observable<any> {
  //   return this.authRestService.changePassword(oldPassword, newPassword);
  // }

  private setUser(user: any | null): void {
    this.user = user;
    // this.currentUser$.next(user);
  }

  private errorHandler(): boolean {
    this.resetUser();
    return false;
  }
}
