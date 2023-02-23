import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IMember} from "../_models/member";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<IMember[]>(`${this.baseUrl}Users`)
  }

  getOneMember(id: number | string) {
    return this.http.get<IMember>(`${this.baseUrl}Users/${id}`)
  }

  updateMember(member: IMember) {
    return this.http.put<IMember>(`${this.baseUrl}Users`, member)
  }
}
