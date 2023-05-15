import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    submitTime: null,
    threeHoursLater: null,
};

export const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        setSubmitTime: (state, action) => {
            state.submitTime = null,
            state.submitTime = action.payload;
            console.log(state.submitTime);
        },
        setThreeHoursLater: (state, action) => {
            state.threeHoursLater = null,
            state.threeHoursLater = action.payload,
            console.log(state.threeHoursLater);
        }
    },
});

export default timeSlice.reducer;
// export const coupon = (state) => state.
export const {setSubmitTime, setThreeHoursLater} = timeSlice.actions;
