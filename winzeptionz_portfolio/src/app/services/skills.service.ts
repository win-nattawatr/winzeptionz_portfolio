import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getSkillsData(): Observable<Skills[]> {
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
