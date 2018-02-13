import { AuthService } from './../core/services/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Barn } from './barn';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BarnService {
  userId: string;
  barnCollection: AngularFirestoreCollection<Barn>;
  public barns$: Observable<Barn[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.userId = this.authService.getUserId();
    this.barnCollection = this.afs.collection('barns', ref => ref.where('uid', '==', this.userId));
    this.barns$ = this.barnCollection.snapshotChanges().map(barns => {
      return barns.map(barn => {
        const data = barn.payload.doc.data() as Barn;
        const $key = barn.payload.doc.id;
        return {$key, ...data};
      });
    });
  }

  add(barn: Barn) {
    return this.barnCollection.add(this.buildBarn(barn));
  }

  buildBarn(barn: Barn) {
    const data: Barn = {
      name: barn.name,
      desc: barn.desc,
      allocation: barn.allocation,
      goal: barn.goal,
      farm$key: barn.farm$key,
      uid: this.userId
    };
    return data;
  }

  update(barn: Barn) {
    return this.barnCollection.doc(barn.$key).update(this.buildBarn(barn));
  }

  delete(barn: Barn) {
    return this.barnCollection.doc(barn.$key).delete();
  }
}
