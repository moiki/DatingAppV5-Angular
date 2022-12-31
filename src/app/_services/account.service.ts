import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {BehaviorSubject, map} from "rxjs";
import {ISessionUser} from "../_models/SessionUser.interface";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/'
  private CurrentUserSource = new BehaviorSubject<ISessionUser>(null);
  CurrentUser$ = this.CurrentUserSource.asObservable();
  constructor(private http: HttpClient) {
  }

  login(model: any) {
    return this.http.post<ISessionUser>(`${this.baseUrl}Account/login`, model)
      .pipe(
        map(data => {
          if (data) {
            localStorage.setItem("session", JSON.stringify(data));
            this.CurrentUserSource.next(data)
          }
        })
      )
  }
  setCurrentUser = (user: ISessionUser) => this.CurrentUserSource.next(user)

  register(model: any) {
    return this.http.post<ISessionUser>(`${this.baseUrl}Account/register`, model)
      .pipe(map(user => {
        localStorage.setItem("session", JSON.stringify(user));
        this.CurrentUserSource.next(user)
      }) )
  }
  logout() {
    localStorage.removeItem("session");
    this.CurrentUserSource.next(null)
  }
}
