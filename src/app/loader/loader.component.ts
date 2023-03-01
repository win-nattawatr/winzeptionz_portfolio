import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  darkTheme: string = 'dark-theme';
  selectedTheme: string | null;

  constructor() {
    this.selectedTheme = localStorage.getItem('selected-theme');
  }

  ngOnInit(): void {
    if (this.selectedTheme) {
      document
        .getElementById('loader')
        ?.classList[this.selectedTheme === 'dark' ? 'add' : 'remove'](
          this.darkTheme
        );
    }
  }
}
