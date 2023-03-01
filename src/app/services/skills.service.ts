import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Skills } from '../models/skills.model';

@Injectable()
export class SkillsService {
  constructor(private firestore: Firestore) {}

  async getSkills() {
    return (await this.getSkillsData()).pop();
  }

  private async getSkillsData(): Promise<Skills[]> {
    const skillsCollection = collection(this.firestore, 'skills').withConverter(
      Skills.FireStoreConvertor
    );
    const activeSkillsData = query(
      skillsCollection,
      where('active', '==', true)
    );
    const skillsSnapshot = await getDocs(activeSkillsData);
    return skillsSnapshot.docs.map((skills) => skills.data());
  }
}
