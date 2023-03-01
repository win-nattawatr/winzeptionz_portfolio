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

  skillListFormat?: SkillList[];
  currentToggle?: number;

  constructor() {}

  ngOnInit(): void {
    if (this.skillData?.skills) {
      this.skillListFormat = this.chunks(this.skillData.skills, 2);
    }
  }

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

  setCurrentToggle(toggleIndex?: number) {
    if (this.currentToggle == toggleIndex) {
      this.currentToggle = undefined;
      return;
    }
    this.currentToggle = toggleIndex;
  }

  getScorePercentage(skillScore: number) {
    return { width: `${skillScore}%` };
  }

  private chunks = (a: SkillList, size: number) =>
    Array.from(new Array(Math.ceil(a.length / size)), (_, i) => {
      return a.slice(i * size, i * size + size).map((item, index: number) => {
        item.toggleIndex = i * size + index;
        return item;
      });
    });
}

type SkillList = {
  toggleIndex?: number;
  skillGroupTitle: string;
  skillGroupSubTitle: string;
  skillList: {
    skillName: string;
    skillScore: number;
  }[];
}[];
