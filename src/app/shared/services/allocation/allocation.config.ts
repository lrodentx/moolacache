import { NGXLogger } from 'ngx-logger';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { Allocation } from './allocation';

import * as _ from 'lodash';

@Injectable()
export abstract class AllocationConfig {
    constructor(public amount: number, public percentages: Allocation[]) {}

    public allocate(): Allocation[] {
        // console.log('Amount To Allocate: ', this.amount);
        // console.log('Percentages To Allocate: ', this.percentages);

        const self = this;

        let allocations  = _.map(self.percentages, function (percentage): Allocation {
            return new Allocation(percentage.id, +(self.amount * 100 * (percentage.amount / 100)).toFixed(0));
        });

        const totalPennies: number = allocations.reduce(function (a, b) {
            return a + b.amount;
        }, 0);

        const leftOverPennies = +(this.amount * 100).toFixed(2) - totalPennies;

        if (leftOverPennies > 0) {
            allocations = this.allocatePennies(leftOverPennies, allocations);
        }

        return _.map(allocations, function (n: Allocation): Allocation {
            return new Allocation(n.id, +(n.amount / 100).toFixed(2));
         });
    }

    public allocatePennies(leftOverPennies: number, allocations: Allocation[]): Allocation[] {
        return allocations;
    }

    public logging(leftOverPennies, allocations, deserving, spread, updatedAllocations) {
        console.log('Pennies Left Over: ' + leftOverPennies);
        console.log('deserving: ', deserving);
        console.log('spread: ', spread);
        console.log('updatedAllocations: ', updatedAllocations);
    }
}
