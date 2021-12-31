import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Qualification } from 'src/app/models/qualification.model';
import { QualificationService } from 'src/app/services/qualification.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css'],
})
export class QualificationComponent implements OnInit {
  qualificationData?: Qualification;
  activeTab: number;
  constructor(private qualificationService: QualificationService) {
    this.activeTab = 1;
  }

  ngOnInit(): void {
    this.qualificationService
      .getQualificationData()
      .pipe(map((qualifications) => qualifications.pop()))
      .subscribe((qualificationData) => {
        this.qualificationData = qualificationData;
      });
  }

  tabClick(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
