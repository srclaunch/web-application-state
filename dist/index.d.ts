import React, { ReactElement } from 'react';
import { AnyAction, EnhancedStore, Middleware, ReducersMapObject, ThunkAction } from '@reduxjs/toolkit';
import { HttpClient } from '@srclaunch/http-client';
import { Model, ModelProps, Route as RouteType, WebApplicationConfig } from '@srclaunch/types';
export declare const history: import("history").BrowserHistory;
export declare const createStore: ({ models, reducers, middleware, }: {
    readonly models?: Record<string, ModelProps<Model>> | undefined;
    readonly reducers?: ReducersMapObject<any, import("redux").Action<any>> | undefined;
    readonly middleware?: readonly Middleware<{}, any, import("redux").Dispatch<AnyAction>>[] | undefined;
}) => EnhancedStore;
export declare const renderReduxWebApp: ({ actions, authentication, container, config, httpClient, routes, store, }: {
    readonly actions?: Record<string, (...args: readonly any[]) => any> | undefined;
    readonly authentication?: boolean | undefined;
    readonly container?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    readonly config?: WebApplicationConfig | undefined;
    readonly httpClient?: typeof HttpClient | undefined;
    readonly routes: readonly RouteType[];
    readonly store: RootState;
}) => Promise<void>;
export declare type RootState = ReturnType<typeof createStore.getState>;
export declare type AppDispatch = RootState['dispatch'];
export declare type AppThunk<ReturnType = unknown> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export { useAppDispatch as useDispatch } from './hooks/use-dispatch';
export { useAppSelector as useSelector } from './hooks/use-selector';
export { hideModelPanel, showModelPanel } from './state/models/index';
export { closeModal, showModal } from './state/ui/modals';
export { addToastNotification } from './state/ui/notifications';
export { addThemes, setTheme } from './state/ui/themes';
export { login, logout, refreshSession, } from './state/user/authentication/login';
export { signUp } from './state/user/authentication/signup';
export { checkUsernameAvailability } from './state/user/authentication/username-availability';
export { resendVerificationCode } from './state/user/authentication/verification/code/resend';
export { getVerificationDetails } from './state/user/authentication/verification/code/status';
export { verifyCode } from './state/user/authentication/verification/code/verify';
export { deletePaymentMethod, getPaymentMethods, } from './state/user/payment-methods';
export { getSubscriptions } from './state/user/subscriptions';
export type { Modal } from './types/modal';
export type { Notification } from './types/notification';
export { NotificationType } from './types/notification';
export { matchPath, matchRoutes } from 'react-router';
export { Link, Navigate, NavLink, Outlet, Route, Router, Routes, useLocation, useMatch, useNavigate, useParams, useResolvedPath, useSearchParams, } from 'react-router-dom';
export { createStore as store };
//# sourceMappingURL=index.d.ts.map