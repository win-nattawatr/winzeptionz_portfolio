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
import { Home } from '../models/home.model';

@Injectable()
export class HomeService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  getHomeData(): Observable<Home[]> {
    const homeCollection = collection(this.firestore, 'home').withConverter(
      Home.FireStoreConvertor
    );
    const activeHomeData = query(homeCollection, where('active', '==', true));
    return collectionData(activeHomeData);
  }

  getHomeProfileImage(fileName: string) {
    const fileRef = ref(this.storage, `home/${fileName}`);
    return getDownloadURL(fileRef);
  }
}
