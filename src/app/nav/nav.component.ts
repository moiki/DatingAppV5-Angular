import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Observable, of} from "rxjs";
import {ISessionUser} from "../_models/SessionUser.interface";

interface ILoginModel {
  UserName?: string;
  Password?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: ILoginModel = {};
  currentUser$: Observable<ISessionUser | null> = of(null)
  constructor(private account: AccountService) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.account.CurrentUser$
  }

  login() {
    this.account.login(this.model)
      .subscribe({
        next: response => {
          // console.log(response);
        },
        error: err => console.log(err)
      })
  }

  logout() {
    this.account.logout();
  }

}
