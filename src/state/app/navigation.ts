import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  detail: string;
  history: {
    page: string;
    detail: string;
  }[];
  page: string;
} = {
  detail: '',
  history: [],
  page: '/',
};

const slice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    goBack: state => {
      const item = state.history.pop();

      if (item) {
        state.page = item.page;
        state.detail = item.detail;
      }
    },
    // navigate: (state, action) => {
    //   const { page, detail } = action.payload;
    //
    //   state.page = page;
    //   state.detail = detail;
    //   state.history = state.history.concat(action.payload);
    // },
  },
});

export default slice.reducer;
export const { goBack } = slice.actions;
