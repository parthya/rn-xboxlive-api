import { ICallProperties, IAuthorization, IPlayerScreenshotsResponse, IPlayerGameclipsResponse } from './__typings__';
export declare const call: (endpoint: string, authorization: IAuthorization, properties?: ICallProperties) => Promise<any>;
export declare const getPlayerXUID: (gamertag: string, authorization: IAuthorization) => Promise<string>;
export declare const getPlayerSettings: (gamertag: string, authorization: IAuthorization, settings?: ("GameDisplayPicRaw" | "Gamerscore" | "Gamertag" | "AccountTier" | "XboxOneRep" | "PreferredColor" | "RealName" | "Bio" | "Location")[]) => Promise<{
    id: string;
    value: string;
}[]>;
export declare const getPlayerScreenshots: (gamertag: string, authorization: IAuthorization, maxItems?: number) => Promise<IPlayerScreenshotsResponse>;
export declare const getPlayerGameclips: (gamertag: string, authorization: IAuthorization, maxItems?: number) => Promise<IPlayerGameclipsResponse>;
