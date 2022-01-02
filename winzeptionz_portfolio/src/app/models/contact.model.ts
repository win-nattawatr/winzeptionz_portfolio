import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export class Contact {
  constructor(documentData: DocumentData, id?: string) {
    this.id = id;
    this.active = documentData['active'];
    this.calls = documentData['calls'];
    this.emails = documentData['emails'];
    this.locations = documentData['locations'];
    this.firstName = documentData['firstName'];
    this.lastName = documentData['lastName'];
    this.nickName = documentData['nickName'];
    this.roleName = documentData['roleName'];
  }

  id: string | undefined;
  active: boolean;
  firstName: string;
  lastName: string;
  nickName: string;
  roleName: string;
  calls: string[];
  emails: string[];
  locations: string[];

  static get FireStoreConvertor() {
    return {
      toFirestore(contact: Contact): DocumentData {
        return {
          active: contact.active,
          calls: contact.calls,
          emails: contact.emails,
          locations: contact.locations,
          firstName: contact.firstName,
          lastName: contact.lastName,
          nickName: contact.nickName,
          roleName: contact.roleName,
        };
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Contact {
        const data = snapshot.data(options)!;
        return new Contact(data, snapshot.id);
      },
    };
  }
}
