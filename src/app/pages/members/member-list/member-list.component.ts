import { Component, OnInit } from '@angular/core';
import {MembersService} from "../../../_services/members.service";
import {IMember} from "../../../_models/member";
import {ParseExpectedErrorResponse} from "../../../../utils/error.utils";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
members: IMember[] = [];
  constructor(private membersService: MembersService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    return this.membersService.getMembers().subscribe({
      next: _members => {
        // console.log(_members)
        this.members = _members
      },
      error: err => {
        const parsedError = ParseExpectedErrorResponse(err);
        this.toast.error(parsedError, "Ups!")
      }
    })
  }
}
