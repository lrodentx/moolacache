import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

@Injectable()
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
  }

  get(user) {
    if (user) {
      return this.usersCollection.doc(user.uid).valueChanges();
    } else {
      return Observable.of(null);
    }
  }

  update(user) {

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return this.usersCollection.doc(user.uid).set(data, { merge: true });
  }

  delete(user) {
    return this.usersCollection.doc(user.uid).delete();
  }

}
