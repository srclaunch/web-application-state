import {
  AnyAction,
  configureStore,
  EnhancedStore,
  Middleware,
  ReducersMapObject,
  ThunkAction,
} from '@reduxjs/toolkit';
import { HttpClient } from '@srclaunch/http-client';
import {
  EnvironmentType,
  Model,
  ModelProps,
  RouteRole,
  Route as RouteType,
  WebApplicationConfig,
} from '@srclaunch/types';
import { getEnvironment } from '@srclaunch/web-environment';
import { createBrowserHistory } from 'history';
import { ReactElement, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { createMiddleware } from './middleware/index';
import { createRootReducer } from './state';
import { setConfig } from './state/app/config';
import { setRoutes } from './state/app/routes';
import { addThemes, setTheme } from './state/ui/themes';
import { refreshSession } from './state/user/authentication/login';

const environment = getEnvironment();

export const history = createBrowserHistory();

export const createStore = ({
  models,
  reducers,
  middleware = [],
}: {
  readonly models?: Record<string, ModelProps<Model>>;
  readonly reducers?: ReducersMapObject;
  readonly middleware?: readonly Middleware[];
}): EnhancedStore =>
  configureStore({
    devTools:
      environment.type === EnvironmentType.Development ||
      environment.type === EnvironmentType.NonProduction,
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware(),
      ...createMiddleware(history, middleware),
    ],
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
  readonly actions?: Record<string, (...args: readonly any[]) => any>;
  readonly authentication?: boolean;
  readonly container?: ReactElement;
  readonly config?: WebApplicationConfig;
  readonly httpClient?: typeof HttpClient;
  readonly routes: readonly RouteType[];
  readonly store: RootState;
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
    <StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={container}>
              {routes.map((route, k: number) => {
                if (route.role === RouteRole.Index) {
                  return (
                    <Route
                      index
                      element={
                        <route.component
                          actions={actions}
                          httpClient={httpClient}
                        />
                      }
                      key={k}
                    />
                  );
                }

                if (route.path) {
                  return (
                    <Route
                      element={
                        <route.component
                          actions={actions}
                          httpClient={httpClient}
                        />
                      }
                      key={k}
                      path={route.path}
                    />
                  );
                }

                return (
                  <Route
                    element={
                      <route.component
                        actions={actions}
                        httpClient={httpClient}
                      />
                    }
                    key={k}
                  />
                );
              })}
            </Route>
          </Routes>
        </Router>
      </Provider>
    </StrictMode>,
    document.querySelector('#root'),
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

export { useAppDispatch as useDispatch } from './hooks/use-dispatch';
export { useAppSelector as useSelector } from './hooks/use-selector';
export { hideModelPanel, showModelPanel } from './state/models/index';
export { closeModal, showModal } from './state/ui/modals';
export { addToastNotification } from './state/ui/notifications';
export { addThemes, setTheme } from './state/ui/themes';
export {
  login,
  logout,
  refreshSession,
} from './state/user/authentication/login';
export { signUp } from './state/user/authentication/signup';
export { checkUsernameAvailability } from './state/user/authentication/username-availability';
export { resendVerificationCode } from './state/user/authentication/verification/code/resend';
export { getVerificationDetails } from './state/user/authentication/verification/code/status';
export { verifyCode } from './state/user/authentication/verification/code/verify';
export {
  deletePaymentMethod,
  getPaymentMethods,
} from './state/user/payment-methods';
export { getSubscriptions } from './state/user/subscriptions';
export type { Modal } from './types/modal';
export type { Notification } from './types/notification';
export { matchPath, matchRoutes } from 'react-router';
export {
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Router,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
  useResolvedPath,
  useSearchParams,
} from 'react-router-dom';

export { createStore as store };
