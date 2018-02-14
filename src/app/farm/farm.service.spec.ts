import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './../core/services/auth.service';
import { TestBed, inject } from '@angular/core/testing';

import { FarmService } from './farm.service';

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

describe('FarmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmService,
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: AngularFirestore, useValue: AngularFirestoreStub } ]
    });
  });

  it('should be created', inject([FarmService], (service: FarmService) => {
    expect(service).toBeTruthy();
  }));
});
