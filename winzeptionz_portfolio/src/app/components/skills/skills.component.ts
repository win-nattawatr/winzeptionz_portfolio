import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Skills } from 'src/app/models/skills.model';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skillData?: Skills;
  currentToggle: number;

  constructor(private skillsService: SkillsService) {
    this.currentToggle = 0;
  }

  ngOnInit(): void {
    this.skillsService
      .getSkillsData()
      .pipe(map((skills) => skills.pop()))
      .subscribe((skillData) => {
        this.skillData = skillData;
      });
  }

  setCurrentToggle(index: number) {
    if (this.currentToggle == index) {
      this.currentToggle = -1;
      return;
    }
    this.currentToggle = index;
  }

  getScorePercentage(skillScore: number) {
    return { width: `${skillScore}%` };
  }
}
