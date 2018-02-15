import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from './../core/services/auth.service';
import { AuthGuard } from './../core/services/auth-guard.service';
import { TestBed, inject } from '@angular/core/testing';
import { MoolaService } from './moola.service';

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

describe('MoolaListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ MoolaService,
                  { provide: AuthService, useValue: AuthServiceStub },
                  { provide: AngularFirestore, useValue: AngularFirestoreStub }]
    });
  });

  it('should be created', inject([MoolaService], (service: MoolaService) => {
    expect(service).toBeTruthy();
  }));
});
