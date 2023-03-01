import { Component, Input, OnInit } from '@angular/core';
import { Qualification } from 'src/app/models/qualification.model';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css'],
})
export class QualificationComponent implements OnInit {
  @Input() qualificationData?: Qualification;
  activeTab: number;

  constructor() {
    this.activeTab = 1;
  }

  ngOnInit(): void {}

  tabClick(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
