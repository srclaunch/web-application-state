declare const _default: import("redux").Reducer<import("redux").CombinedState<{
    authentication: import("redux").CombinedState<{
        state: {
            initialized: boolean;
            lastUpdated?: string | undefined;
            loggedIn: boolean;
            tokens?: {
                accessToken: string;
            } | undefined;
        };
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
    }>;
    details: Partial<import("@srclaunch/types").User> & {
        attributes?: Record<string, string> | undefined;
        error?: import("@srclaunch/exceptions").Exception | Error | undefined;
        inProgress: boolean;
        lastUpdated?: import("luxon").DateTime | undefined;
    };
}>, import("redux").AnyAction>;
export default _default;
//# sourceMappingURL=index.d.ts.map