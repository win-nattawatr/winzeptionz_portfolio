import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio.model';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Virtual,
  EffectFade,
  SwiperOptions,
  Swiper,
} from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, Virtual, EffectFade]);

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PortfolioComponent implements OnInit {
  @Input() portfolioData?: Portfolio;
  @ViewChild('section') section?: ElementRef;

  swiperConfig: SwiperOptions;
  nextDOMNode: string;
  prevDOMNode: string;

  constructor() {
    this.swiperConfig = {
      navigation: true,
      pagination: {
        clickable: true,
      },
      loop: true,
    };

    this.nextDOMNode =
      '<i class="uil uil-angle-right-b swiper-portfolio-icon"></i>';

    this.prevDOMNode =
      '<i class="uil uil-angle-left-b swiper-portfolio-icon"></i>';
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

  onSwiper(swiper: Swiper) {
    swiper.navigation.nextEl.innerHTML = this.nextDOMNode;
    swiper.navigation.prevEl.innerHTML = this.prevDOMNode;
  }
}
