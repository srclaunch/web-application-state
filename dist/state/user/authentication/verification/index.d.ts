declare const _default: import("redux").Reducer<import("redux").CombinedState<{
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
}>, import("redux").AnyAction>;
export default _default;
//# sourceMappingURL=index.d.ts.map