import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route as RouteType } from '@srclaunch/types';

type AppState = {
  list?: Omit<RouteType, 'component'>[];
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
      action: PayloadAction<Omit<RouteType, 'component'>[]>,
    ) => {
      state.list = action.payload;
    },
  },
});

export const { setRoutes } = slice.actions;
export default slice.reducer;
