import { ConfirmComponent } from '../../core/common/confirm/confirm.component';
import { MatDialog } from '@angular/material';

export abstract class Entity {

  constructor(protected dialog: MatDialog) { }

  confirmDelete() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '20em'
    });

    dialog.afterClosed()
      .subscribe(yesClicked => {
        if (yesClicked) {
          this.delete();
        }
      });
  }

  abstract delete();
}
