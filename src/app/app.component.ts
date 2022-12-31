import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {AccountService} from "./_services/account.service";
import {ISessionUser} from "./_models/SessionUser.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  constructor(private account: AccountService) {
  }

  ngOnInit() {
    this.setUser();
  }


  setUser() {
    const userString = localStorage.getItem("session");
    console.log(userString)
    if (!userString) return;
    const user: ISessionUser = JSON.parse(userString);
    this.account.setCurrentUser(user)
  }
}
