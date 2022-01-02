import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
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

  getAbout() {
    return this.getAboutData().pipe(
      map((abouts) => abouts.pop()),
      mergeMap(async (about) => {
        if (about?.profileImg?.name) {
          about.profileImgUrl = await this.getAboutProfileImage(
            about.profileImg.name
          );
        }
        return about;
      }),
      mergeMap(async (about) => {
        if (about?.cv?.name) {
          about.cvUrl = await this.getAboutCV(about.cv.name);
        }
        return about;
      })
    );
  }

  private getAboutData(): Observable<About[]> {
    const aboutCollection = collection(this.firestore, 'about').withConverter(
      About.FireStoreConvertor
    );
    const activeAboutData = query(aboutCollection, where('active', '==', true));
    return collectionData(activeAboutData);
  }

  private getAboutProfileImage(fileName: string) {
    const imageRef = ref(this.storage, `about/${fileName}`);
    return getDownloadURL(imageRef);
  }

  private getAboutCV(fileName: string) {
    const cvRef = ref(this.storage, `about/${fileName}`);
    return getDownloadURL(cvRef);
  }
}
