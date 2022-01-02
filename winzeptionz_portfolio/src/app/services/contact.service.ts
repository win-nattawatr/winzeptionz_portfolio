import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
} from '@angular/fire/firestore';
import { Contact } from '../models/contact.model';

@Injectable()
export class ContactService {
  constructor(private firestore: Firestore) {}

  getContact() {
    return this.getContactData().pipe(map((contacts) => contacts.pop()));
  }

  private getContactData(): Observable<Contact[]> {
    const contactCollection = collection(
      this.firestore,
      'contact'
    ).withConverter(Contact.FireStoreConvertor);
    const activeContactData = query(
      contactCollection,
      where('active', '==', true)
    );
    return collectionData(activeContactData);
  }
}
