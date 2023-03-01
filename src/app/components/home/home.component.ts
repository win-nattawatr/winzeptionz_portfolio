import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Home } from 'src/app/models/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() homeData?: Home;
  @ViewChild('section') section?: ElementRef;

  constructor() {}

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
}
