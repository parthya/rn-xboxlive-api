import { IExtraErrorProperties } from './__typings__/errors';
declare class XboxLiveAPIError extends Error {
    XBLAuthError: boolean;
    extra: any;
    constructor(message?: string, extra?: IExtraErrorProperties);
}
declare const errors: {
    internal: (message?: string, statusCode?: number) => XboxLiveAPIError;
    forbidden: (message?: string, statusCode?: number) => XboxLiveAPIError;
    unauthorized: (message?: string, statusCode?: number) => XboxLiveAPIError;
    badRequest: (message?: string, statusCode?: number) => XboxLiveAPIError;
    requestError: (message?: string, statusCode?: number) => XboxLiveAPIError;
};
export = errors;
