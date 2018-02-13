import { Injectable } from '@angular/core';
import { AllocationConfig } from './allocation.config';
import { Allocation } from './allocation';

import * as _ from 'lodash';

// Allocate money using the Highest Averages, D'Hondt Method.

@Injectable()
export class AllocationHAM extends AllocationConfig {

    public allocatePennies(leftOverPennies: number, allocations: Allocation[]) {
        const quotient = function(x: number, y: number): number {
            return +(x / y).toFixed(2);
        };

        const spread: Allocation[] = _.map(_.clone(allocations), function(n: Allocation): Allocation {
            return new Allocation(n.id, 0);
        });

        const spreadLookup = function(id) {
             return _.find(spread, function(allocation: Allocation) { return allocation.id === id; }).amount;
        };

        let deserving: Allocation[] = [];
        for (let round = 1; round <= leftOverPennies; round++ ) {
            deserving = _.orderBy(_.map(allocations, function (n: Allocation): Allocation {
                return new Allocation(n.id, quotient(n.amount, spreadLookup(n.id) + round + 1));
            }), 'amount', 'desc');

            const match = _.find(spread, function(allocation: Allocation) { return allocation.id === _.head(deserving).id; });

            if (match) {
                match.amount = match.amount + 1;
            }

        }

        const updatedAllocations = _.map(allocations,
        function (n: Allocation): Allocation { return new Allocation(n.id, n.amount + spreadLookup(n.id));  });
        // this.logging(leftOverPennies, allocations, deserving, spread, updatedAllocations);
        return updatedAllocations;
    }

}
