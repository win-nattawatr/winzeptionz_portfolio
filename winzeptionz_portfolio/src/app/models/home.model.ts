import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export class Home {
  constructor(documentData: DocumentData, id?: string) {
    this.id = id;
    this.active = documentData['active'];
    this.description = documentData['description'];
    this.facebookUrl = documentData['facebookUrl'];
    this.lineContactUrl = documentData['lineContactUrl'];
    this.linkedInUrl = documentData['linkedInUrl'];
    this.profileImg = documentData['profileImg'];
    this.subtitle = documentData['title'];
    this.title = documentData['title'];
  }

  id: string | undefined;
  active: boolean;
  description: string;
  facebookUrl: string;
  lineContactUrl: string;
  linkedInUrl: string;
  profileImg: {
    name: string;
    x: number;
    y: number;
  };
  profileImgUrl?: string;
  subtitle: string;
  title: string;

  static get FireStoreConvertor() {
    return {
      toFirestore(home: Home): DocumentData {
        return {
          active: home.active,
          description: home.description,
          facebookUrl: home.facebookUrl,
          lineContactUrl: home.lineContactUrl,
          linkedInUrl: home.linkedInUrl,
          profileImg: home.profileImg,
          subtitle: home.subtitle,
          title: home.title,
        };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Home {
        const data = snapshot.data(options)!;
        return new Home(data, snapshot.id);
      },
    };
  }
}
