import { Component, OnInit } from '@angular/core';
import {IMember} from "../../../_models/member";
import {MembersService} from "../../../_services/members.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ParseExpectedErrorResponse} from "../../../../utils/error.utils";
import {ToastrService} from "ngx-toastr";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "@kolkov/ngx-gallery";
import {TabDirective} from "ngx-bootstrap/tabs";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member: IMember;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab?: TabDirective;
  constructor(
    private memberService: MembersService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }
loadMember() {
    this.memberService.getOneMember(this.activeRoute.snapshot.paramMap.get("id"))
      .subscribe({
        next: member => {
          this.member = member;
          this.galleryImages = this.getImages();
        },
        error: err => {
          console.log(err)
          const parsedError = ParseExpectedErrorResponse(err);
          this.toast.error(parsedError, "Ups!")
          this.route.navigateByUrl("/members")
        }
      })
}
  onTabActivated(event: any) {
    console.log("Hola")
  }

  getImages() {
    if (!this.member) return [];
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imageUrls;
  }

}
