import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export class Portfolio {
  constructor(documentData: DocumentData, id?: string) {
    this.id = id;
    this.active = documentData['active'];
    this.works = documentData['works'];
  }

  id: string | undefined;
  active: boolean;
  works: {
    name: string;
    description: string;
    targetUrl: string;
    imgName: string;
    imgUrl?: string;
  }[];

  static get FireStoreConvertor() {
    return {
      toFirestore(portfolio: Portfolio): DocumentData {
        return {
          active: portfolio.active,
          works: portfolio.works,
        };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Portfolio {
        const data = snapshot.data(options)!;
        return new Portfolio(data, snapshot.id);
      },
    };
  }
}
