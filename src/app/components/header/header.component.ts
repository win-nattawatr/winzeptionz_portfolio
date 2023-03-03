import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() contactData?: Contact;
  @ViewChild('header') header?: ElementRef;
  @ViewChild('themeButton') themeButton?: ElementRef;

  navToggle: boolean;
  darkTheme: string = 'dark-theme';
  selectedTheme: string | null;

  constructor() {
    this.navToggle = false;
    this.selectedTheme = localStorage.getItem('selected-theme');
  }

  ngOnInit(): void {
    if (this.selectedTheme) {
      document.body.classList[this.selectedTheme === 'dark' ? 'add' : 'remove'](
        this.darkTheme
      );
    }
  }

  showMenu() {
    this.navToggle = true;
  }

  hideMenu() {
    this.navToggle = false;
  }

  getName() {
    if (this.contactData) {
      return `${this.contactData.firstName} ${this.contactData.lastName[0]}`;
    }
    return '';
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    if (scrollY >= 80)
      this.header?.nativeElement.classList.add('scroll-header');
    else this.header?.nativeElement.classList.remove('scroll-header');
  }

  changeTheme() {
    document.body.classList.toggle(this.darkTheme);

    let currentTheme = this.getCurrentTheme();
    this.selectedTheme = currentTheme;
    localStorage.setItem('selected-theme', currentTheme);
  }

  private getCurrentTheme() {
    return document.body.classList.contains(this.darkTheme) ? 'dark' : 'light';
  }
}
