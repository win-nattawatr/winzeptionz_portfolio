import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getQualificationData(): Observable<Qualification[]> {
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
