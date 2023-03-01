import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Services } from 'src/app/models/services.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  @Input() servicesData?: Services;
  @ViewChild('section') section?: ElementRef;

  activeModalIndex: number;

  constructor() {
    this.activeModalIndex = -1;
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

  activeModal(modalIndex: number) {
    this.activeModalIndex = modalIndex;
  }

  closeModal() {
    this.activeModalIndex = -1;
  }
}
