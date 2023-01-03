import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NavComponent} from './nav/nav.component';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from './pages/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MemberListComponent} from './pages/members/member-list/member-list.component';
import {MemberDetailsComponent} from './pages/members/member-details/member-details.component';
import {ListsComponent} from './pages/lists/lists.component';
import {MessagesComponent} from './pages/messages/messages.component';
import {ToastrModule} from "ngx-toastr";
import {JwtInterceptor} from "./_interceptors/jwt.interceptor";
import {TabsModule} from "ngx-bootstrap/tabs";
import {NgxGalleryModule} from "@kolkov/ngx-gallery";
import { MemberEditComponent } from './pages/members/member-edit/member-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailsComponent,
    ListsComponent,
    MessagesComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule,
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
