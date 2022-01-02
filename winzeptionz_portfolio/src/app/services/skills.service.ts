import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
} from '@angular/fire/firestore';
import { Skills } from '../models/skills.model';

@Injectable()
export class SkillsService {
  constructor(private firestore: Firestore) {}

  getSkills() {
    return this.getSkillsData().pipe(map((skills) => skills.pop()));
  }

  private getSkillsData(): Observable<Skills[]> {
    const skillsCollection = collection(this.firestore, 'skills').withConverter(
      Skills.FireStoreConvertor
    );
    const activeSkillsData = query(
      skillsCollection,
      where('active', '==', true)
    );
    return collectionData(activeSkillsData);
  }
}
