import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
} from '@angular/fire/firestore';
import { Qualification } from '../models/qualification.model';

@Injectable()
export class QualificationService {
  constructor(private firestore: Firestore) {}

  getQualification() {
    return this.getQualificationData().pipe(
      map((qualifications) => qualifications.pop())
    );
  }

  private getQualificationData(): Observable<Qualification[]> {
    const qualificationCollection = collection(
      this.firestore,
      'qualification'
    ).withConverter(Qualification.FireStoreConvertor);
    const activeQualificationData = query(
      qualificationCollection,
      where('active', '==', true)
    );
    return collectionData(activeQualificationData);
  }
}
