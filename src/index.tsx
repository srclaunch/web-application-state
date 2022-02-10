import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { WebApplication } from '@srclaunch/ui';
import { HttpClient } from '@srclaunch/http-client';

import {
  AnyAction,
  configureStore,
  EnhancedStore,
  Middleware,
  ReducersMapObject,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import {
  EnvironmentType,
  Model,
  ModelProps,
  PageRole,
  PageRoute,
  WebApplicationConfig,
} from '@srclaunch/types';
import { getEnvironment } from '@srclaunch/environment-web';

import { createMiddleware } from './middleware';
import { createRootReducer } from './state';
import { refreshSession } from './state/user/authentication/login';
import { setConfig } from './state/app/config';
import { setRoutes } from './state/app/routes';
import { addThemes, setTheme } from './state/ui/themes';

const environment = getEnvironment();

export const history = createBrowserHistory();

export const createStore = ({
  models,
  reducers,
  middleware = [],
}: {
  models?: Record<string, ModelProps<Model>>;
  reducers?: ReducersMapObject;
  middleware?: Middleware[];
}): EnhancedStore =>
  configureStore({
    devTools:
      environment.type === EnvironmentType.Development ||
      environment.type === EnvironmentType.NonProduction,
    middleware: getDefaultMiddleware =>
      [...getDefaultMiddleware(), ...createMiddleware(history, middleware)],
    reducer: createRootReducer({ models, reducers }),
  });

export const renderReduxWebApp = async ({
  actions,
  authentication = false,
  container,
  config,
  httpClient,
  routes,
  store,
}: {
  actions?: Record<string, (...args: any[]) => any>;
  authentication?: boolean;
  container?: ReactElement;
  config?: WebApplicationConfig;
  httpClient?: typeof HttpClient;
  routes: PageRoute[];
  store: RootState;
}): Promise<void> => {
  await store.dispatch(setConfig(config));

  if (config?.ui?.themes?.custom) {
    await store.dispatch(addThemes(config.ui.themes.custom));
  }

  if (config?.ui?.themes?.default) {
    await store.dispatch(setTheme(config.ui.themes.default));
  } 

  await store.dispatch(
    setRoutes(routes.map(({ component, ...route }) => ({ ...route }))),
  );

  if (authentication) {
    await store.dispatch(refreshSession());
  }

  return ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={container}>
              {routes.map((route, k: number) => {
                if (route.role === PageRole.Index) {
                  return <Route index element={<route.component actions={actions} httpClient={httpClient} />} key={k} />;
                }

                if (route.path) {
                  return (
                    <Route
                      element={<route.component actions={actions} httpClient={httpClient} />}
                      key={k}
                      path={route.path}
                    />
                  );
                }

                return <Route element={<route.component actions={actions} httpClient={httpClient} />} key={k} />;
              })}
            </Route>
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

// Infer the `RootState` and `AppDispatch` types from the store itself
// @ts-ignore
export type RootState = ReturnType<typeof createStore.getState>;

export type AppDispatch = RootState['dispatch'];

export type AppThunk<ReturnType = unknown> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export { 
  matchPath,
  matchRoutes,
} from 'react-router';

export {
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  Router,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
  useResolvedPath,
  useSearchParams,
} from 'react-router-dom';

export { useAppDispatch as useDispatch } from './hooks/use-dispatch';
export { useAppSelector as useSelector } from './hooks/use-selector';

export {
  login,
  logout,
  refreshSession,
} from './state/user/authentication/login';
export { resendVerificationCode } from './state/user/authentication/verification/code/resend';
export { getVerificationDetails } from './state/user/authentication/verification/code/status';
export { verifyCode } from './state/user/authentication/verification/code/verify';

export { signUp } from './state/user/authentication/signup';
export { checkUsernameAvailability } from './state/user/authentication/username-availability';

export { hideModelPanel, showModelPanel } from './state/models/index';

export { closeModal, showModal } from './state/ui/modals';
export { addToastNotification } from './state/ui/notifications';
export { addThemes, setTheme } from './state/ui/themes';

export {
  deletePaymentMethod,
  getPaymentMethods,
} from './state/user/payment-methods';
export { getSubscriptions } from './state/user/subscriptions';

export { createStore as store };
