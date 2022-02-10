import { Exception } from '@srclaunch/exceptions';
import { ISO8601String } from '@srclaunch/types';
import { AppThunk } from '../../../index';
declare type UsernameAvailabilityState = {
    available?: boolean;
    error?: Exception | Error;
    lastUpdated?: ISO8601String;
    inProgress: boolean;
    success?: boolean;
};
declare const _default: import("redux").Reducer<UsernameAvailabilityState, import("redux").AnyAction>;
export default _default;
export declare const checkUsernameAvailability: ({ username }: {
    username: string;
}) => AppThunk;
//# sourceMappingURL=username-availability.d.ts.map