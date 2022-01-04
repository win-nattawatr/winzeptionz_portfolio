import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { Home } from '../models/home.model';

@Injectable()
export class HomeService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  async getHome() {
    const home = (await this.getHomeData()).pop();
    if (home?.profileImg?.name) {
      home.profileImgUrl = await this.getHomeProfileImage(home.profileImg.name);
    }
    return home;
  }

  private async getHomeData(): Promise<Home[]> {
    const homeCollection = collection(this.firestore, 'home').withConverter(
      Home.FireStoreConvertor
    );
    const activeHomeData = query(homeCollection, where('active', '==', true));
    const homeSnapshot = await getDocs(activeHomeData);
    return homeSnapshot.docs.map((home) => home.data());
  }

  private getHomeProfileImage(fileName: string) {
    const fileRef = ref(this.storage, `home/${fileName}`);
    return getDownloadURL(fileRef);
  }
}
