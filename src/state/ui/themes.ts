import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '@srclaunch/types';
import { AppLabLightTheme, AppLabDarkTheme } from '@srclaunch/themes';

type ThemeState = {
  current?: Theme['id'];
  list?: Theme[];
};

const initialState: ThemeState = {
  current: AppLabLightTheme.id,
  list: [AppLabLightTheme, AppLabDarkTheme],
};

const slice = createSlice({
  initialState,
  name: 'themes',
  reducers: {
    addThemes: (state, action) => {
      state.list = action.payload;
    },
    setTheme: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { addThemes, setTheme } = slice.actions;
export default slice.reducer;
