import { ISO8601String } from '@srclaunch/types';
declare type AuthenticationState = {
    initialized: boolean;
    lastUpdated?: ISO8601String;
    loggedIn: boolean;
    tokens?: {
        accessToken: string;
    };
};
export declare const setLoggedIn: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    accessToken: string;
}, string>, setLoggedOut: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
declare const _default: import("redux").Reducer<import("redux").CombinedState<{
    state: AuthenticationState;
    login: {
        error?: import("@srclaunch/exceptions").Exception | Error | undefined;
        lastUpdated?: string | undefined;
        inProgress: boolean;
        success?: boolean | undefined;
    };
    signup: {
        error?: import("@srclaunch/exceptions").Exception | Error | undefined;
        lastUpdated?: string | undefined;
        inProgress: boolean;
        success?: boolean | undefined;
        userId?: string | undefined;
    };
    usernameAvailability: {
        available?: boolean | undefined;
        error?: import("@srclaunch/exceptions").Exception | Error | undefined;
        lastUpdated?: string | undefined;
        inProgress: boolean;
        success?: boolean | undefined;
    };
    verification: import("redux").CombinedState<{
        code: import("redux").CombinedState<{
            resend: {
                error?: import("@srclaunch/exceptions").Exception | Error | undefined;
                lastUpdated?: string | undefined;
                inProgress: boolean;
                success?: boolean | undefined;
            };
            status: {
                delivery?: {
                    destination: string;
                    medium: import("@srclaunch/types").CommunicationMedium;
                } | undefined;
                error?: import("@srclaunch/exceptions").Exception | Error | undefined;
                inProgress: boolean;
                lastUpdated?: string | undefined;
                status?: string | undefined;
                success?: boolean | undefined;
            };
            verify: {
                error?: import("@srclaunch/exceptions").Exception | Error | undefined;
                lastUpdated?: string | undefined;
                inProgress: boolean;
                success?: boolean | undefined;
            };
        }>;
    }>;
}>, import("redux").AnyAction>;
export default _default;
//# sourceMappingURL=index.d.ts.map