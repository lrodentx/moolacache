import { MoolaDetail } from '../moola-detail/moola-detail';

export interface Moola {
    $key?: string;
    date: Date;
    farm$key: string;
    farmName: string;
    amountToAllocate: number;
    moolaDetails: MoolaDetail[];
    uid: string;
  }
