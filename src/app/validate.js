import {createSlice} from '@reduxjs/toolkit';
import {validationSchema} from '../utils/ValidationSchema';

const initialState = {
  validation: validationSchema,
};
export const validateSlice = createSlice({
  name: 'validate',
  initialState,
  reducers: {
    // any additional reducers for this slice can be defined here
  },
});

export default validateSlice.reducer;
