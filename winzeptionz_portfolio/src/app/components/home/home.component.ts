import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  linkedInUrl?: string;
  facebookUrl?: string;
  lineContactUrl?: string;

  private linkedInUrlSupscription?: Subscription;
  private facebookUrlSupscription?: Subscription;
  private lineContactUrlSupscription?: Subscription;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.linkedInUrlSupscription = this.homeService
      .getLinkedInUrl()
      .subscribe((url) => {
        this.linkedInUrl = url;
      });
    this.facebookUrlSupscription = this.homeService
      .getFacebookUrl()
      .subscribe((url) => {
        this.facebookUrl = url;
      });
    this.lineContactUrlSupscription = this.homeService
      .getLineUrl()
      .subscribe((url) => {
        this.lineContactUrl = url;
      });
  }

  ngOnDestroy(): void {
    this.linkedInUrlSupscription?.unsubscribe();
    this.facebookUrlSupscription?.unsubscribe();
    this.lineContactUrlSupscription?.unsubscribe();
  }
}
