"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("superagent");
const XboxLiveAPIError = require("./errors");
const HTTPStatusCodes = require("http-status-codes");
const fs_1 = require("react-native-fs");
const path_1 = require("react-native-path");
const __typings__1 = require("./__typings__");
const { version } = JSON.parse(fs_1.readFileSync('package.json', 'utf-8'));
const USER_AGENT = `Mozilla/5.0 (XboxReplay; XboxLiveAPI ${version}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36`;
const BASE_HEADERS = {
    Accept: 'application/json; charset=utf-8',
    'Accept-Language': 'en-US',
    'User-Agent': USER_AGENT
};
const _isCallStatusCodeValid = (statusCode) => [
    HTTPStatusCodes.OK,
    HTTPStatusCodes.ACCEPTED,
    HTTPStatusCodes.NO_CONTENT,
    HTTPStatusCodes.CREATED
].indexOf(statusCode) !== -1;
exports.call = (endpoint, authorization, properties = {}) => {
    const { userHash, XSTSToken } = authorization;
    const method = properties.method || 'GET';
    const qs = properties.qs ? properties.qs : void 0;
    const payload = properties.payload || void 0;
    return new Promise((resolve, reject) => {
        request({
            uri: endpoint,
            qs,
            json: payload === void 0 ? true : payload,
            followRedirect: true,
            headers: Object.assign({}, BASE_HEADERS, { 'x-xbl-contract-version': 2, Authorization: `XBL3.0 x=${userHash};${XSTSToken}` }),
            method
        }, (err, response, body) => {
            if (err)
                return reject(XboxLiveAPIError.internal(err.message));
            const statusCode = response.statusCode;
            if (statusCode === HTTPStatusCodes.FORBIDDEN) {
                return reject(XboxLiveAPIError.forbidden());
            }
            else if (statusCode === HTTPStatusCodes.UNAUTHORIZED) {
                return reject(XboxLiveAPIError.unauthorized());
            }
            if (_isCallStatusCodeValid(response.statusCode) === false)
                return reject(XboxLiveAPIError.requestError(`Got a request error for "${endpoint}"`, response.statusCode));
            else
                resolve(body);
        });
    });
};
exports.getPlayerXUID = (gamertag, authorization) => __awaiter(this, void 0, void 0, function* () {
    if (!isNaN(Number(gamertag)) && String(gamertag).length === 16) {
        const xuid = gamertag;
        return xuid;
    }
    const response = yield exports.call(__typings__1.XboxLiveDomains.Profile +
        path_1.join('users', `gt(${encodeURIComponent(gamertag)})`, 'settings'), authorization);
    if (response.profileUsers[0] === void 0) {
        throw XboxLiveAPIError.internal();
    }
    return response.profileUsers[0].id;
});
exports.getPlayerSettings = (gamertag, authorization, settings = []) => __awaiter(this, void 0, void 0, function* () {
    const response = yield exports.call(__typings__1.XboxLiveDomains.Profile +
        path_1.join('users', `gt(${encodeURIComponent(gamertag)})`, 'settings'), authorization, { qs: { settings: settings.join(',') } });
    if (response.profileUsers[0] === void 0) {
        throw XboxLiveAPIError.internal();
    }
    return response.profileUsers[0].settings;
});
exports.getPlayerScreenshots = (gamertag, authorization, maxItems = 25) => __awaiter(this, void 0, void 0, function* () {
    const playerXUID = yield exports.getPlayerXUID(gamertag, authorization);
    return exports.call(__typings__1.XboxLiveDomains.Screenshots +
        path_1.join('users', `xuid(${playerXUID})`, 'screenshots'), authorization, { qs: { maxItems } });
});
exports.getPlayerGameclips = (gamertag, authorization, maxItems = 25) => __awaiter(this, void 0, void 0, function* () {
    const playerXUID = yield exports.getPlayerXUID(gamertag, authorization);
    return exports.call(__typings__1.XboxLiveDomains.Gameclips +
        path_1.join('users', `xuid(${playerXUID})`, 'clips'), authorization, { qs: { maxItems } });
});
