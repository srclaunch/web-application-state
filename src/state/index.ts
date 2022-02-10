import { AnyAction, Reducer, combineReducers } from '@reduxjs/toolkit';
import { Model } from '@srclaunch/types';
import { createModelsReducer } from './models';
import app from './app';
import ui from './ui';
import user from './user';

export const createRootReducer = ({
  models,
  reducers,
}: {
  models?: Record<string, Model>;
  reducers?: { [k: string]: Reducer<unknown, AnyAction> };
}): Reducer => {
  return combineReducers({
    ...reducers,
    app,
    models: createModelsReducer(models),
    ui,
    user,
  });
};
