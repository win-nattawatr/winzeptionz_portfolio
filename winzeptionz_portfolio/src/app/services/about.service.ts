import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
  aboutDataLoading$: BehaviorSubject<boolean>;
  aboutProfileImage$: BehaviorSubject<boolean>;
  aboutCVLoading$: BehaviorSubject<boolean>;

  constructor(private firestore: Firestore, private storage: Storage) {
    this.aboutDataLoading$ = new BehaviorSubject<boolean>(false);
    this.aboutProfileImage$ = new BehaviorSubject<boolean>(false);
    this.aboutCVLoading$ = new BehaviorSubject<boolean>(false);
  }

  getAboutData(): Observable<About[]> {
    const aboutCollection = collection(this.firestore, 'about').withConverter(
      About.FireStoreConvertor
    );
    const activeAboutData = query(aboutCollection, where('active', '==', true));
    return collectionData(activeAboutData).pipe(
      tap(() => this.aboutDataLoading$.next(true))
    );
  }

  getAboutProfileImage(fileName: string) {
    const imageRef = ref(this.storage, `about/${fileName}`);
    return getDownloadURL(imageRef).then((url) => {
      this.aboutProfileImage$.next(true);
      return url;
    });
  }

  getAboutCV(fileName: string) {
    const cvRef = ref(this.storage, `about/${fileName}`);
    return getDownloadURL(cvRef);
  }
}
