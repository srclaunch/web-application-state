import { Middleware, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { History } from 'history';
export declare function createMiddleware(history: History, appMiddleware: Middleware[]): Middleware<{}, any, Dispatch<AnyAction>>[];
//# sourceMappingURL=index.d.ts.map