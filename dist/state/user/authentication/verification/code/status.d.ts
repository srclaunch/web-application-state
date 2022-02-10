import { Exception } from '@srclaunch/exceptions';
import { CommunicationMedium, ISO8601String } from '@srclaunch/types';
import { AppThunk } from '../../../../../index';
declare type VerificationStatusState = {
    delivery?: {
        destination: string;
        medium: CommunicationMedium.Email | CommunicationMedium.PhoneNumber;
    };
    error?: Exception | Error;
    inProgress: boolean;
    lastUpdated?: ISO8601String;
    status?: string;
    success?: boolean;
};
declare const _default: import("redux").Reducer<VerificationStatusState, import("redux").AnyAction>;
export default _default;
export declare const getVerificationDetails: ({ userId }: {
    userId: string;
}) => AppThunk;
//# sourceMappingURL=status.d.ts.map