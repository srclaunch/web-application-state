import { Subscription } from '@srclaunch/types';
import { DateTime } from 'luxon';
import { AppThunk } from '../../index';
export declare const selectors: import("@reduxjs/toolkit").EntitySelectors<Subscription, any>;
declare type SubscriptionsState = {
    error?: Error | string;
    in_progress: boolean;
    initialized: boolean;
    last_updated?: DateTime;
};
export declare const getSubscriptions: () => AppThunk;
declare const _default: import("redux").Reducer<import("@reduxjs/toolkit").EntityState<Subscription> & SubscriptionsState, import("redux").AnyAction>;
export default _default;
//# sourceMappingURL=subscriptions.d.ts.map