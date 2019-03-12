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
const XboxLiveAPI = require("../");
beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});
it("should retrieve specified player's XUID", () => __awaiter(this, void 0, void 0, function* () {
    const authorization = {
        userHash: '1234567890123456',
        XSTSToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.WyJBcmUgeW91IGxvb2tpbmcgZm9yIHNvbWV0aGluZz8iXQ.OfRjqsoMbmeksokqRHXE7BgjblODCZ-m0c5PQ3PIFWc'
    };
    const xuid = '2535465515082324';
    const mock = jest.spyOn(XboxLiveAPI, 'getPlayerXUID');
    mock.mockReturnValueOnce(new Promise(resolve => resolve('2535465515082324')));
    const response = yield XboxLiveAPI.getPlayerXUID('Zeny IC', authorization);
    expect(response).toEqual(xuid);
}));
it("should retrieve specified player's settings", () => __awaiter(this, void 0, void 0, function* () {
    const authorization = {
        userHash: '1234567890123456',
        XSTSToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.WyJBcmUgeW91IGxvb2tpbmcgZm9yIHNvbWV0aGluZz8iXQ.OfRjqsoMbmeksokqRHXE7BgjblODCZ-m0c5PQ3PIFWc'
    };
    const settings = [{ id: 'Gamertag', value: 'Zeny IC' }];
    const mock = jest.spyOn(XboxLiveAPI, 'getPlayerSettings');
    mock.mockReturnValueOnce(new Promise(resolve => resolve(settings)));
    const response = yield XboxLiveAPI.getPlayerSettings('Zeny IC', authorization, ['Gamertag']);
    expect(response).toEqual(settings);
}));
it("should retrieve specified player's screenshots", () => __awaiter(this, void 0, void 0, function* () {
    const authorization = {
        userHash: '1234567890123456',
        XSTSToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.WyJBcmUgeW91IGxvb2tpbmcgZm9yIHNvbWV0aGluZz8iXQ.OfRjqsoMbmeksokqRHXE7BgjblODCZ-m0c5PQ3PIFWc'
    };
    const screenshots = {
        screenshots: [],
        pagingInfo: { continuationToken: 'xxx' }
    };
    const mock = jest.spyOn(XboxLiveAPI, 'getPlayerScreenshots');
    mock.mockReturnValueOnce(new Promise(resolve => resolve(screenshots)));
    const response = yield XboxLiveAPI.getPlayerScreenshots('Zeny IC', authorization);
    expect(response).toEqual(screenshots);
}));
it("should retrieve specified player's gameclips", () => __awaiter(this, void 0, void 0, function* () {
    const authorization = {
        userHash: '1234567890123456',
        XSTSToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.WyJBcmUgeW91IGxvb2tpbmcgZm9yIHNvbWV0aGluZz8iXQ.OfRjqsoMbmeksokqRHXE7BgjblODCZ-m0c5PQ3PIFWc'
    };
    const gameclips = {
        gameClips: [],
        pagingInfo: { continuationToken: 'xxx' }
    };
    const mock = jest.spyOn(XboxLiveAPI, 'getPlayerGameclips');
    mock.mockReturnValueOnce(new Promise(resolve => resolve(gameclips)));
    const response = yield XboxLiveAPI.getPlayerGameclips('Zeny IC', authorization);
    expect(response).toEqual(gameclips);
}));
