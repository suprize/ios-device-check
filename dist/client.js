"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// (c) PepperHQ Limited - All Right Reserved
const api = __importStar(require("./api"));
var ApiHost;
(function (ApiHost) {
    ApiHost["PRODUCTION"] = "api.devicecheck.apple.com";
    ApiHost["DEVELOPMENT"] = "api.development.devicecheck.apple.com";
})(ApiHost = exports.ApiHost || (exports.ApiHost = {}));
class DeviceCheck {
    constructor(host) {
        this.host = host;
    }
    QueryDevice(jwt, payload) {
        return api.QueryDevice(this.host, jwt, payload);
    }
    UpdateDevice(jwt, payload) {
        return api.UpdateDevice(this.host, jwt, payload);
    }
    ValidateDevice(jwt, payload) {
        return api.ValidateDevice(this.host, jwt, payload);
    }
}
exports.DeviceCheck = DeviceCheck;
//# sourceMappingURL=client.js.map