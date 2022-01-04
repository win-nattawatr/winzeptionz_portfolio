import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Portfolio } from '../models/portfolio.model';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';

@Injectable()
export class PortfolioService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  async getPortfolio() {
    const portfolio = (await this.getPortfolioData()).pop();
    if (portfolio?.works) {
      portfolio.works.map(async (work) => {
        work.imgUrl = await this.getWorkImage(work.imgName);
      });
    }
    return portfolio;
  }

  private async getPortfolioData(): Promise<Portfolio[]> {
    const portfolioCollection = collection(
      this.firestore,
      'portfolio'
    ).withConverter(Portfolio.FireStoreConvertor);
    const activePortfolioData = query(
      portfolioCollection,
      where('active', '==', true)
    );
    const portfolioSnapshot = await getDocs(activePortfolioData);
    return portfolioSnapshot.docs.map((portfolio) => portfolio.data());
  }

  private getWorkImage(fileName: string) {
    const fileRef = ref(this.storage, `portfolio/${fileName}`);
    return getDownloadURL(fileRef);
  }
}
