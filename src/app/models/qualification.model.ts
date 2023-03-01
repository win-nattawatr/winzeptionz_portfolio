import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export class Qualification {
  constructor(documentData: DocumentData, id?: string) {
    this.id = id;
    this.active = documentData['active'];
    this.educations = documentData['educations'];
    this.works = documentData['works'];
  }

  id: string | undefined;
  active: boolean;
  educations: {
    role: string;
    address: string;
    period: {
      from: Date;
      to: Date;
    };
  }[];
  works: {
    role: string;
    address: string;
    period: {
      from: Date;
      to: Date;
    };
  }[];

  static get FireStoreConvertor() {
    return {
      toFirestore(qualification: Qualification): DocumentData {
        return {
          active: qualification.active,
          educations: qualification.educations,
          works: qualification.works,
        };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Qualification {
        const data = snapshot.data(options)!;
        return new Qualification(data, snapshot.id);
      },
    };
  }
}
