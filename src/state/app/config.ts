import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebApplicationConfig } from '@srclaunch/types';

type AppState = WebApplicationConfig | undefined;

const initialState: AppState = {
  aws: {},
};

const slice = createSlice({
  initialState,
  name: 'config',
  reducers: {
    setConfig: (
      state,
      action: PayloadAction<WebApplicationConfig | undefined>,
    ) => {
      if (action.payload) {
        const { aws } = action.payload;

        state.aws = aws;
      }
    },
  },
});

export const { setConfig } = slice.actions;
export default slice.reducer;
