import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Observable, of} from "rxjs";
import {ISessionUser} from "../_models/SessionUser.interface";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ParseExpectedErrorResponse, ParseResponseError} from "../../utils/error.utils";

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
  constructor(private account: AccountService, private route: Router, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.account.CurrentUser$
  }

  login() {
    this.account.login(this.model)
      .subscribe({
        next: _ => this.route.navigateByUrl("/members"),
        error: err => {
          console.log(err)
          const error = ParseExpectedErrorResponse(err)
          this.toast.error(error, "Ups!", {
            enableHtml: true,
            closeButton: true
          })
        }
      })
  }

  logout() {
    this.account.logout();
  }

}
