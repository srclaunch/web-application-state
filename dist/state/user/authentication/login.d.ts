import { Exception } from '@srclaunch/exceptions';
import { ISO8601String } from '@srclaunch/types';
import { AppThunk } from '../../../index';
declare type LoginState = {
    error?: Exception | Error;
    lastUpdated?: ISO8601String;
    inProgress: boolean;
    success?: boolean;
};
declare const _default: import("redux").Reducer<LoginState, import("redux").AnyAction>;
export default _default;
export declare const login: ({ username, password }: {
    username: string;
    password: string;
}) => AppThunk;
export declare const refreshSession: () => AppThunk;
export declare const logout: () => AppThunk;
//# sourceMappingURL=login.d.ts.map