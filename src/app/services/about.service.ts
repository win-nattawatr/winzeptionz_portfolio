import { Injectable } from '@angular/core';
import { Firestore, collection, query, where } from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { About } from '../models/about.model';
import { getDocs } from 'firebase/firestore';

@Injectable()
export class AboutService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  async getAbout() {
    const about = (await this.getAboutData()).pop();
    if (about?.profileImg?.name) {
      about.profileImgUrl = await this.getAboutProfileImage(
        about.profileImg.name
      );
    }
    if (about?.cv?.name) {
      about.cvUrl = await this.getAboutCV(about.cv.name);
    }
    return about;
  }

  private async getAboutData(): Promise<About[]> {
    const aboutCollection = collection(this.firestore, 'about').withConverter(
      About.FireStoreConvertor
    );
    const activeAboutData = query(aboutCollection, where('active', '==', true));
    const aboutSnapshot = await getDocs(activeAboutData);
    return aboutSnapshot.docs.map((about) => about.data());
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
