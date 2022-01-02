import {
  AfterContentInit,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { map, Observable, zip } from 'rxjs';
import { Main } from './models/main.model';
import { AboutService } from './services/about.service';
import { ContactService } from './services/contact.service';
import { HomeService } from './services/home.service';
import { PortfolioService } from './services/portfolio.service';
import { QualificationService } from './services/qualification.service';
import { ServicesService } from './services/services.service';
import { SkillsService } from './services/skills.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('scrollup') scrollup?: ElementRef;
  mainData?: Main;
  mainData$: Observable<Main>;

  constructor(
    private aboutService: AboutService,
    private homeService: HomeService,
    private skillsService: SkillsService,
    private qualificationService: QualificationService,
    private servicesService: ServicesService,
    private portfolioService: PortfolioService,
    private contactService: ContactService
  ) {
    this.mainData$ = zip(
      this.aboutService.getAbout(),
      this.homeService.getHome(),
      this.skillsService.getSkills(),
      this.qualificationService.getQualification(),
      this.servicesService.getServices(),
      this.portfolioService.getPortfolio(),
      this.contactService.getContact()
    ).pipe(
      map((data) => {
        return {
          about: data[0],
          home: data[1],
          skills: data[2],
          qualification: data[3],
          services: data[4],
          portfolio: data[5],
          contact: data[6],
        };
      })
    );

    const scrollY = window.scrollY;
  }

  ngOnInit(): void {
    this.mainData$.subscribe((data) => {
      this.mainData = data;
    });
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    if (scrollY >= 560)
      this.scrollup?.nativeElement.classList.add('show-scroll');
    else this.scrollup?.nativeElement.classList.remove('show-scroll');
  }
}
