import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { About } from 'src/app/models/about.model';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  aboutData?: About;
  profileImageUrl?: string;
  cvUrl?: string;

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService
      .getAboutData()
      .pipe(
        map((abouts) => abouts.pop()),
        mergeMap(async (about) => {
          await this.getAboutProfileImageUrl(about);
          return about;
        }),
        mergeMap(async (about) => {
          await this.getAboutCVUrl(about);
          return about;
        })
      )
      .subscribe((aboutData) => {
        this.aboutData = aboutData;
      });
  }

  private async getAboutProfileImageUrl(aboutData: About | undefined) {
    if (aboutData?.profileImg?.name) {
      this.profileImageUrl = await this.aboutService.getAboutProfileImage(
        aboutData.profileImg.name
      );
    }
  }

  private async getAboutCVUrl(aboutData: About | undefined) {
    if (aboutData?.cv?.name) {
      this.cvUrl = await this.aboutService.getAboutCV(aboutData.cv.name);
    }
  }
}
