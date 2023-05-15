import {configureStore} from '@reduxjs/toolkit';
import {couponSlice} from './coupon';
import {validateSlice} from './validate';
import {authSlice} from './auth';
import { timeSlice } from './time';

const store = configureStore({
    reducer: {
        coupon: couponSlice.reducer,
        validate: validateSlice.reducer,
        auth: authSlice.reducer,
        time: timeSlice.reducer,
    },
});

export default store;
