import { User } from '../../../core/services/user';
import { Observable } from 'rxjs/Observable';

const USER_OBJECT: User = <User>{};

export class MockUser {

  public user(): Observable<User> {
    return Observable.of(USER_OBJECT);
  }
}
