import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Main } from '../models/main.model';
import { AboutService } from '../services/about.service';
import { ContactService } from '../services/contact.service';
import { HomeService } from '../services/home.service';
import { PortfolioService } from '../services/portfolio.service';
import { QualificationService } from '../services/qualification.service';
import { ServicesService } from '../services/services.service';
import { SkillsService } from '../services/skills.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @ViewChild('scrollup') scrollup?: ElementRef;
  mainData?: Main;

  constructor(
    private route: ActivatedRoute,
    private aboutService: AboutService,
    private homeService: HomeService,
    private skillsService: SkillsService,
    private qualificationService: QualificationService,
    private servicesService: ServicesService,
    private portfolioService: PortfolioService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.getMainData().then((mainData) => {
      this.mainData = mainData;
    });
  }

  async getMainData(): Promise<Main> {
    return {
      about: await this.aboutService.getAbout(),
      home: await this.homeService.getHome(),
      skills: await this.skillsService.getSkills(),
      qualification: await this.qualificationService.getQualification(),
      services: await this.servicesService.getServices(),
      portfolio: await this.portfolioService.getPortfolio(),
      contact: await this.contactService.getContact(),
    };
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (scrollY >= 560)
      this.scrollup?.nativeElement.classList.add('show-scroll');
    else this.scrollup?.nativeElement.classList.remove('show-scroll');
  }
}
