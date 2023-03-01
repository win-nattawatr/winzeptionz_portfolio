import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Qualification } from '../models/qualification.model';

@Injectable()
export class QualificationService {
  constructor(private firestore: Firestore) {}

  async getQualification() {
    return (await this.getQualificationData()).pop();
  }

  private async getQualificationData(): Promise<Qualification[]> {
    const qualificationCollection = collection(
      this.firestore,
      'qualification'
    ).withConverter(Qualification.FireStoreConvertor);
    const activeQualificationData = query(
      qualificationCollection,
      where('active', '==', true)
    );
    const qualificationSnapshot = await getDocs(activeQualificationData);
    return qualificationSnapshot.docs.map((qualification) =>
      qualification.data()
    );
  }
}
