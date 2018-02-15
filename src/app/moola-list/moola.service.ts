import { AuthService } from './../core/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Moola } from './../moola/moola';
import { Injectable } from '@angular/core';

@Injectable()
export class MoolaService {
  userId: string;
  moolaCollection: AngularFirestoreCollection<Moola>;
  public moola$: Observable<Moola[]>;

  constructor(public angularFirestore: AngularFirestore, private authService: AuthService) {
    this.userId = this.authService.getUserId();
    this.moolaCollection = this.angularFirestore.collection('moola', ref => ref.where('uid', '==', this.userId));
    this.moola$ = this.moolaCollection.snapshotChanges().map(moolas => {
      return moolas.map(moola => {
        const data = moola.payload.doc.data() as Moola;
        const $key = moola.payload.doc.id;
        return {$key, ...data};
      });
    });
  }

  add(moola: Moola) {
    return this.moolaCollection.add(this.buildMoola(moola));
  }

  buildMoola(moola: Moola) {
    const data: Moola = {
      date: moola.date,
      farm$key: moola.farm$key,
      farmName: moola.farmName,
      amountToAllocate: moola.amountToAllocate,
      moolaDetails: moola.moolaDetails,
      uid: this.userId
    };
    return data;
  }

  update(moola: Moola) {
    return this.moolaCollection.doc(moola.$key).update(this.buildMoola(moola));
  }

  delete(moola: Moola) {
    return this.moolaCollection.doc(moola.$key).delete();
  }
}
