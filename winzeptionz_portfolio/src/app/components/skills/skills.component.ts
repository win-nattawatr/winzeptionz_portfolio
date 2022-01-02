import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Skills } from 'src/app/models/skills.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  @Input() skillData?: Skills;
  @ViewChild('section') section?: ElementRef;

  currentToggle: number;

  constructor() {
    this.currentToggle = 0;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setActive();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    this.setActive();
  }

  setActive() {
    let sectionHeight = this.section?.nativeElement.offsetHeight;
    let sectionTop = this.section?.nativeElement.offsetTop - 50;
    let sectionId = this.section?.nativeElement.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(`.nav__menu a[href*='${sectionId}']`)
        ?.classList.add('active-link');
    } else {
      document
        .querySelector(`.nav__menu a[href*='${sectionId}']`)
        ?.classList.remove('active-link');
    }
  }

  setCurrentToggle(index: number) {
    if (this.currentToggle == index) {
      this.currentToggle = -1;
      return;
    }
    this.currentToggle = index;
  }

  getScorePercentage(skillScore: number) {
    return { width: `${skillScore}%` };
  }
}
