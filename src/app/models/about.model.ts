import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export class About {
  constructor(documentData: DocumentData, id?: string) {
    this.id = id;
    this.active = documentData['active'];
    this.description = documentData['description'];
    this.profileImg = documentData['profileImg'];
    this.infos = documentData['infos'];
    this.cv = documentData['cv'];
  }

  id: string | undefined;
  active: boolean;
  description: string;
  infos: {
    first: string;
    second: string;
  }[];
  profileImg: {
    name: string;
  };
  profileImgUrl?: string;
  cv: {
    name: string;
  };
  cvUrl?: string;

  static get FireStoreConvertor() {
    return {
      toFirestore(about: About): DocumentData {
        return {
          active: about.active,
          description: about.description,
          infos: about.infos,
          profileImg: about.profileImg,
          cv: about.cv,
        };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): About {
        const data = snapshot.data(options)!;
        return new About(data, snapshot.id);
      },
    };
  }
}
