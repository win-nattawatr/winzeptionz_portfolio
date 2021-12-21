import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  navToggle: boolean;

  constructor() {
    this.navToggle = false;
  }

  ngOnInit(): void {}

  showMenu() {
    this.navToggle = true;
  }

  hideMenu() {
    this.navToggle = false;
  }
}
