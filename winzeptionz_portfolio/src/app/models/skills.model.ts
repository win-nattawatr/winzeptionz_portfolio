import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export class Skills {
  constructor(documentData: DocumentData, id?: string) {
    this.id = id;
    this.active = documentData['active'];
    this.skills = documentData['skills'];
  }

  id: string | undefined;
  active: boolean;
  skills: {
    skillGroupTitle: string;
    skillGroupSubTitle: string;
    skillList: {
      skillName: string;
      skillScore: number;
    }[];
  }[];

  static get FireStoreConvertor() {
    return {
      toFirestore(home: Skills): DocumentData {
        return {
          active: home.active,
          skills: home.skills,
        };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Skills {
        const data = snapshot.data(options)!;
        return new Skills(data, snapshot.id);
      },
    };
  }
}
