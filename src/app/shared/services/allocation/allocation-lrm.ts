import { Injectable } from '@angular/core';
import { AllocationConfig } from './allocation.config';
import { Allocation } from './allocation';

import * as _ from 'lodash';

// Allocate left over pennies using the Largest Remainder Method.

@Injectable()
export class AllocationLRM extends AllocationConfig {

    public allocatePennies(leftOverPennies: number, allocations: Allocation[]): Allocation[] {

        const remainder = function(x: number, y: number): number {
            return x % y;
        };

        const  deserving: Allocation[] = _.take(_.orderBy(_.map(allocations, function (n: Allocation): Allocation {
            return new Allocation(n.id, remainder(leftOverPennies, n.amount));
        }), 'amount', 'desc'), leftOverPennies);

        const spread = _.map(_.intersectionBy(allocations, deserving, 'id'),
            function (n: Allocation): Allocation { return new Allocation(n.id, n.amount + 1); });

        const updatedAllocations = _.orderBy(_.union(spread, _.xorBy(allocations, spread, 'id')), 'id', 'asc');
        // this.logging(leftOverPennies, allocations, deserving, spread, updatedAllocations);
        return updatedAllocations;
    }

}
