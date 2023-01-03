import {Component, OnInit, ViewChild} from '@angular/core';
import {IMember} from "../../../_models/member";
import {ISessionUser} from "../../../_models/SessionUser.interface";
import {AccountService} from "../../../_services/account.service";
import {MembersService} from "../../../_services/members.service";
import {ToastrService} from "ngx-toastr";
import {take} from "rxjs";
import {ParseExpectedErrorResponse} from "../../../../utils/error.utils";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  memberData: IMember;
  sessionUser: ISessionUser

  constructor(
    private account: AccountService,
    private memberService: MembersService,
    private toast: ToastrService
  ) {
    account.CurrentUser$.pipe(take(1))
      .subscribe({next: user => this.sessionUser = user, error: err => toast.error(ParseExpectedErrorResponse(err))})
  }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    this.memberService.getOneMember(this.sessionUser.id)
      .subscribe({
        next: user => this.memberData = user,
        error: err => this.toast.error(ParseExpectedErrorResponse(err))
      })
  }

  updateMember() {
    this.toast.success("Changes has been saved!", "Great!")
    this.editForm.reset(this.memberData);
  }
}
