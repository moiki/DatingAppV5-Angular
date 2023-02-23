import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {MemberListComponent} from "./pages/members/member-list/member-list.component";
import {MemberDetailsComponent} from "./pages/members/member-details/member-details.component";
import {ListsComponent} from "./pages/lists/lists.component";
import {MessagesComponent} from "./pages/messages/messages.component";
import {AuthGuard} from "./_guards/auth.guard";
import {MemberEditComponent} from "./pages/members/member-edit/member-edit.component";
import {PreventUnsavedChangesGuard} from "./_guards/prevent-unsaved-changes.guard";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {path: "members", component: MemberListComponent},
      {path: "members/:id", component: MemberDetailsComponent},
      {path: "member/edit", component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: "lists", component: ListsComponent},
      {path: "messages", component: MessagesComponent},
    ]
  },

  {path: "**", component: HomeComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
