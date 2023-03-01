import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export class Services {
  constructor(documentData: DocumentData, id?: string) {
    this.id = id;
    this.active = documentData['active'];
    this.services = documentData['services'];
  }

  id: string | undefined;
  active: boolean;
  services: {
    name: string;
    details: string[];
  }[];

  static get FireStoreConvertor() {
    return {
      toFirestore(services: Services): DocumentData {
        return {
          active: services.active,
          services: services.services,
        };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Services {
        const data = snapshot.data(options)!;
        return new Services(data, snapshot.id);
      },
    };
  }
}
