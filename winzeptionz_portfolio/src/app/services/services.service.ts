import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
} from '@angular/fire/firestore';
import { Services } from '../models/services.model';

@Injectable()
export class ServicesService {
  constructor(private firestore: Firestore) {}

  getServicesData(): Observable<Services[]> {
    const servicesCollection = collection(
      this.firestore,
      'services'
    ).withConverter(Services.FireStoreConvertor);
    const activeServicesData = query(
      servicesCollection,
      where('active', '==', true)
    );
    return collectionData(activeServicesData);
  }
}
