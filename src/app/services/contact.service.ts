import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Contact } from '../models/contact.model';

@Injectable()
export class ContactService {
  constructor(private firestore: Firestore) {}

  async getContact() {
    return (await this.getContactData()).pop();
  }

  private async getContactData(): Promise<Contact[]> {
    const contactCollection = collection(
      this.firestore,
      'contact'
    ).withConverter(Contact.FireStoreConvertor);
    const activeContactData = query(
      contactCollection,
      where('active', '==', true)
    );
    const contactSnapshot = await getDocs(activeContactData);
    return contactSnapshot.docs.map((contact) => contact.data());
  }
}
