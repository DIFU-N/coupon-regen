import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    couponCode: '',
};

export const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        setCouponCode: (state, action) => {
            state.couponCode = '',
            state.couponCode = action.payload;
            console.log(state.couponCode);
        },
    },
});

export default couponSlice.reducer;
// export const coupon = (state) => state.
export const {setCouponCode} = couponSlice.actions;
