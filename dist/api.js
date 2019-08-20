"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// (c) PepperHQ Limited - All Right Reserved
const node_fetch_1 = __importDefault(require("node-fetch"));
const uuid_1 = __importDefault(require("uuid"));
function isQueryDeviceResult(result) {
    return typeof result.bit0 === 'boolean' &&
        typeof result.bit1 === 'boolean' &&
        typeof result.last_update_time === 'string';
}
async function QueryDevice(host, jwt, payload) {
    const url = `https://${host}/v1/query_two_bits`;
    const headers = {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    };
    const body = {
        device_token: payload.device_token,
        transaction_id: payload.transaction_id || uuid_1.default(),
        timestamp: payload.timestamp || Date.now()
    };
    const response = await node_fetch_1.default(url, { method: 'POST', headers, body: JSON.stringify(body) });
    if (response.status !== 200) {
        throw new Error(`Device check api returned ${response.status}: ${await response.text()}`);
    }
    const responseText = await response.text();
    try {
        const responseBody = JSON.parse(responseText);
        if (!isQueryDeviceResult(responseBody)) {
            throw new Error('Failed to parse response from device check api');
        }
        return responseBody;
    }
    catch (e) {
        throw new Error(`Failed to parse Device check api response: ${responseText}`);
    }
}
exports.QueryDevice = QueryDevice;
async function UpdateDevice(host, jwt, payload) {
    const url = `https://${host}/v1/update_two_bits`;
    const headers = {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    };
    const body = {
        device_token: payload.device_token,
        bit0: payload.bit0,
        bit1: payload.bit1,
        transaction_id: payload.transaction_id || uuid_1.default(),
        timestamp: payload.timestamp || Date.now(),
    };
    const response = await node_fetch_1.default(url, { method: 'POST', headers, body: JSON.stringify(body) });
    if (response.status !== 200) {
        throw new Error(`Device check api returned ${response.status}: ${await response.text()}`);
    }
}
exports.UpdateDevice = UpdateDevice;
// The documentation is cryptic about what is returned if the token is invalid so we assume any error === invalid 
// and throw an error if one is returned instead of returning a boolean.
async function ValidateDevice(host, jwt, payload) {
    const url = `https://${host}/v1/validate_device_token`;
    const headers = {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    };
    const body = {
        device_token: payload.device_token,
        transaction_id: payload.transaction_id || uuid_1.default(),
        timestamp: payload.timestamp || Date.now()
    };
    const response = await node_fetch_1.default(url, { method: 'POST', headers, body: JSON.stringify(body) });
    if (response.status !== 200) {
        throw new Error(`Device check api returned ${response.status}: ${await response.text()}`);
    }
}
exports.ValidateDevice = ValidateDevice;
//# sourceMappingURL=api.js.map