import { Exception } from '@srclaunch/exceptions';
import { User } from '@srclaunch/types';
import { DateTime } from 'luxon';
import { AppThunk } from '../../index';
declare type UserDetailsState = Partial<User> & {
    attributes?: Record<string, string>;
    error?: Exception | Error;
    inProgress: boolean;
    lastUpdated?: DateTime;
};
export declare const setUserAttributes: import("@reduxjs/toolkit").ActionCreatorWithPayload<Record<string, string>, string>;
declare const _default: import("redux").Reducer<UserDetailsState, import("redux").AnyAction>;
export default _default;
export declare const getUserDetails: () => AppThunk;
//# sourceMappingURL=details.d.ts.map