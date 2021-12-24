import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { Home } from 'src/app/models/home.model';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homeData?: Home;
  profileImageUrl?: string;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService
      .getHomeData()
      .pipe(
        map((homes) => homes.pop()),
        mergeMap(async (home) => {
          await this.getHomeProfileImageUrl(home);
          return home;
        })
      )
      .subscribe((homeData) => {
        this.homeData = homeData;
      });
  }

  private async getHomeProfileImageUrl(homeData: Home | undefined) {
    if (homeData?.profileImg?.name) {
      this.profileImageUrl = await this.homeService.getHomeProfileImage(
        homeData.profileImg.name
      );
    }
  }
}
