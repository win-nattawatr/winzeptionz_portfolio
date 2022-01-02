import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable, of, toArray } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
} from '@angular/fire/firestore';
import { Portfolio } from '../models/portfolio.model';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';

@Injectable()
export class PortfolioService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  getPortfolio() {
    return this.getPortfolioData().pipe(
      map((portfolios) => portfolios.pop()),
      mergeMap((portfolio) => {
        if (portfolio?.works) {
          return from(portfolio.works).pipe(
            mergeMap(async (work) => {
              const url = await this.getWorkImage(work.imgName);
              work.imgUrl = url;
              return work;
            }),
            toArray(),
            map((works) => ({ ...portfolio, works }))
          );
        }
        return of(portfolio);
      })
    );
  }

  private getPortfolioData(): Observable<Portfolio[]> {
    const portfolioCollection = collection(
      this.firestore,
      'portfolio'
    ).withConverter(Portfolio.FireStoreConvertor);
    const activePortfolioData = query(
      portfolioCollection,
      where('active', '==', true)
    );
    return collectionData(activePortfolioData);
  }

  private getWorkImage(fileName: string) {
    const fileRef = ref(this.storage, `portfolio/${fileName}`);
    return getDownloadURL(fileRef);
  }
}
