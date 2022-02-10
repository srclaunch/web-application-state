import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageRoute } from '@srclaunch/types';

type AppState = {
  list?: Omit<PageRoute, 'component'>[];
};

const initialState: AppState = {
  list: [],
};

const slice = createSlice({
  initialState,
  name: 'routes',
  reducers: {
    setRoutes: (
      state,
      action: PayloadAction<Omit<PageRoute, 'component'>[]>,
    ) => {
      state.list = action.payload;
    },
  },
});

export const { setRoutes } = slice.actions;
export default slice.reducer;
