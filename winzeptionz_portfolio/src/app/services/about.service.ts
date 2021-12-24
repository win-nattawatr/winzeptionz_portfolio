import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
} from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { About } from '../models/about.model';

@Injectable()
export class AboutService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  getAboutData(): Observable<About[]> {
    const aboutCollection = collection(this.firestore, 'about').withConverter(
      About.FireStoreConvertor
    );
    const activeAboutData = query(aboutCollection, where('active', '==', true));
    return collectionData(activeAboutData);
  }

  getAboutProfileImage(fileName: string) {
    const imageRef = ref(this.storage, `about/${fileName}`);
    return getDownloadURL(imageRef);
  }

  getAboutCV(fileName: string) {
    const cvRef = ref(this.storage, `about/${fileName}`);
    return getDownloadURL(cvRef);
  }
}
