import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountService} from "../../_services/account.service";
import {ParseResponseError} from "../../../utils/error.utils";

enum GENDER {
  male = 'male',
  female = 'female'
}
interface IRegisterModel {
  UserName?: string;
  Password?: string;
  City?: string;
  Gender: GENDER ;
  Country?: string;
  KnownAs?: string;
  DateOfBirth?: string | Date;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() toggleRegisterMode = new EventEmitter();
  @Input() users: any;
  error: any = null;
  model: IRegisterModel = { Gender: GENDER.male};
  genders: GENDER[] = [GENDER.male, GENDER.female]
  constructor(private account: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    this.account.register(this.model).subscribe({
      next: () => this.cancel(),
      error: err => {
        console.log(err);
        this.error = ParseResponseError(err)
      }
    })
  }
  cancel = () => this.toggleRegisterMode.emit(false)

}
