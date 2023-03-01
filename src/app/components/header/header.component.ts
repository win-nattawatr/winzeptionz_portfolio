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
  iconTheme: string = 'uil-sun';
  selectedTheme: string | null;
  selectedIcon: string | null;

  constructor() {
    this.navToggle = false;
    this.selectedTheme = localStorage.getItem('selected-theme');
    this.selectedIcon = localStorage.getItem('selected-icon');
  }

  ngOnInit(): void {
    if (this.selectedTheme) {
      document.body.classList[this.selectedTheme === 'dark' ? 'add' : 'remove'](
        this.darkTheme
      );
      this.themeButton?.nativeElement.classList[
        this.selectedTheme === 'uil-moon' ? 'add' : 'remove'
      ](this.iconTheme);
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
    return 'My Profile';
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    if (scrollY >= 80)
      this.header?.nativeElement.classList.add('scroll-header');
    else this.header?.nativeElement.classList.remove('scroll-header');
  }

  changeTheme() {
    document.body.classList.toggle(this.darkTheme);
    this.themeButton?.nativeElement.classList.toggle(this.iconTheme);

    localStorage.setItem('selected-theme', this.getCurrentTheme());
    localStorage.setItem('selected-icon', this.getCurrentIcon());
  }

  private getCurrentTheme() {
    return document.body.classList.contains(this.darkTheme) ? 'dark' : 'light';
  }

  private getCurrentIcon() {
    return this.themeButton?.nativeElement.classList.contains(this.iconTheme)
      ? 'uil-moon'
      : 'uil-sun';
  }
}
