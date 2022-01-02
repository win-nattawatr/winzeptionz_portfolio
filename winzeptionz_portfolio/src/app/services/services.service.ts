import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  getServices() {
    return this.getServicesData().pipe(map((services) => services.pop()));
  }

  private getServicesData(): Observable<Services[]> {
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
