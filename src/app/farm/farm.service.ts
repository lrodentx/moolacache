import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Farm } from './farm';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/services/auth.service';


@Injectable()
export class FarmService {
  userId: string;
  farmCollection: AngularFirestoreCollection<Farm>;
  public farms$: Observable<Farm[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.userId = this.authService.getUserId();
    this.farmCollection = this.afs.collection('farms', ref => ref.where('uid', '==', this.userId));
    this.farms$ = this.farmCollection.snapshotChanges().map(farms => {
      return farms.map(farm => {
        const data = farm.payload.doc.data() as Farm;
        const $key = farm.payload.doc.id;
        return {$key, ...data};
      });
    });
  }

  add(farm: Farm) {
    const data: Farm = {
      name: farm.name,
      desc: farm.desc,
      uid: this.userId
    };

    return this.farmCollection.add(data);
  }

  update(farm: Farm) {
    const data: Farm = {
      $key: farm.$key,
      name: farm.name,
      desc: farm.desc,
      uid: farm.uid
    };

    return this.farmCollection.doc(farm.$key).update(data);
  }

  delete(farm: Farm) {
    this.farmCollection.doc(farm.$key).delete();
  }
}
