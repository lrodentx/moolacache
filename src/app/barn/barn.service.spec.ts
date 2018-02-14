import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './../core/services/auth.service';
import { TestBed, inject } from '@angular/core/testing';

import { BarnService } from './barn.service';

const AuthServiceStub = {
  getUserId: (userid) => {
    return 'testUser';
  }
};

const AngularFirestoreStub = {
  collection: () => {
      return { snapshotChanges: () => ({ map: () => ({})})};
    }
};

describe('BarnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ BarnService,
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: AngularFirestore, useValue: AngularFirestoreStub } ]
    });
  });

  it('should be created', inject([BarnService], (service: BarnService) => {
    expect(service).toBeTruthy();
  }));
});
