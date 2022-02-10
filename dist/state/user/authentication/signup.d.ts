import { Exception } from '@srclaunch/exceptions';
import { ISO8601String } from '@srclaunch/types';
import { AppThunk } from '../../../index';
declare type SignupState = {
    error?: Exception | Error;
    lastUpdated?: ISO8601String;
    inProgress: boolean;
    success?: boolean;
    userId?: string;
};
declare const _default: import("redux").Reducer<SignupState, import("redux").AnyAction>;
export default _default;
export declare const signUp: ({ firstName, lastName, password, username, }: {
    firstName: string;
    lastName: string;
    password: string;
    username: string;
}) => AppThunk;
//# sourceMappingURL=signup.d.ts.map