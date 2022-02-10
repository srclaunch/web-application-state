import { PaymentMethod } from '@srclaunch/types';
import { DateTime } from 'luxon';
import { AppThunk } from '../../index';
export declare const selectors: import("@reduxjs/toolkit").EntitySelectors<PaymentMethod, any>;
declare type PaymentMethodsState = {
    error?: Error | string;
    in_progress: boolean;
    initialized: boolean;
    last_updated?: DateTime;
};
export declare const getPaymentMethods: () => AppThunk;
export declare const deletePaymentMethod: (id: PaymentMethod['id']) => AppThunk;
declare const _default: import("redux").Reducer<import("@reduxjs/toolkit").EntityState<PaymentMethod> & PaymentMethodsState, import("redux").AnyAction>;
export default _default;
//# sourceMappingURL=payment-methods.d.ts.map