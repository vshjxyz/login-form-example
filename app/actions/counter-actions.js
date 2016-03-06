'use strict';

import { ActionTypes } from '../shared/constants';

export default {
    add(amount) {
       return {
           type: ActionTypes.COUNTER_ADD,
           amount: amount
       };
    }
};