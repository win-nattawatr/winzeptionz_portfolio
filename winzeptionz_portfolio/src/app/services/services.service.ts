import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Services } from '../models/services.model';

@Injectable()
export class ServicesService {
  constructor(private firestore: Firestore) {}

  async getServices() {
    return (await this.getServicesData()).pop();
  }

  private async getServicesData(): Promise<Services[]> {
    const servicesCollection = collection(
      this.firestore,
      'services'
    ).withConverter(Services.FireStoreConvertor);
    const activeServicesData = query(
      servicesCollection,
      where('active', '==', true)
    );
    const servicesSnapshot = await getDocs(activeServicesData);
    return servicesSnapshot.docs.map((services) => services.data());
  }
}
