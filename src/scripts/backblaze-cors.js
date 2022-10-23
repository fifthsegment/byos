"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateCors = exports.listBuckets2 = exports.listBuckets = exports.updateBucket = exports.authorizeAccount = exports.getAuthorizationToken = exports.getBaseUrl = void 0;
var B2 = require('backblaze-b2');
var axios = require('axios');
var getBaseUrl = function () { return 'https://api.backblazeb2.com/b2api/v2/'; };
exports.getBaseUrl = getBaseUrl;
var getAuthorizationToken = function (key, secret) {
    return btoa("".concat(key, ":").concat(secret));
};
exports.getAuthorizationToken = getAuthorizationToken;
var authorizeAccount = function (authorizationToken) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios({
                        method: 'GET',
                        url: "".concat((0, exports.getBaseUrl)(), "b2_authorize_account"),
                        headers: {
                            Accept: 'application/json',
                            Authorization: "Basic ".concat(authorizationToken)
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.authorizeAccount = authorizeAccount;
var updateBucket = function (url, authorizationToken, data) { return __awaiter(void 0, void 0, void 0, function () {
    var genurl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                genurl = "".concat(url, "/b2api/v2/b2_update_bucket");
                console.log("Calling url = ", genurl);
                return [4 /*yield*/, axios({
                        method: 'post',
                        url: genurl,
                        data: data,
                        headers: {
                            Accept: 'application/json',
                            Authorization: "".concat(authorizationToken)
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
exports.updateBucket = updateBucket;
var listBuckets = function (url, accountId, authorizationToken) { return __awaiter(void 0, void 0, void 0, function () {
    var genurl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                genurl = "".concat((0, exports.getBaseUrl)(), "b2_list_buckets");
                console.log("Calling url = ", genurl);
                return [4 /*yield*/, axios({
                        method: 'post',
                        url: genurl,
                        data: {
                            accountId: accountId
                        },
                        headers: {
                            Accept: 'application/json',
                            Authorization: "Bearer ".concat(authorizationToken)
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
exports.listBuckets = listBuckets;
var listBuckets2 = function (key, secret, bucket) { return __awaiter(void 0, void 0, void 0, function () {
    function GetBucket() {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, b2.authorize()];
                    case 1:
                        _a.sent(); // must authorize first (authorization lasts 24 hrs)
                        return [4 /*yield*/, b2.getBucket({ bucketName: bucket })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_1 = _a.sent();
                        console.log('Error getting bucket:', err_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    var b2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                b2 = new B2({
                    applicationKeyId: key,
                    applicationKey: secret // or masterApplicationKey
                });
                return [4 /*yield*/, GetBucket()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.listBuckets2 = listBuckets2;
var updateCors = function (key, secret, bucket) {
    function GetBucket() {
        return __awaiter(this, void 0, void 0, function () {
            var token, authorized, bucketData, bucketId, bucketUpdateData, bucketUpdateResponse, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        token = (0, exports.getAuthorizationToken)(key, secret);
                        return [4 /*yield*/, (0, exports.authorizeAccount)(token)];
                    case 1:
                        authorized = _a.sent();
                        return [4 /*yield*/, (0, exports.listBuckets2)(key, secret, bucket)];
                    case 2:
                        bucketData = _a.sent();
                        console.log("bucketData", bucketData);
                        bucketId = bucketData.buckets[0].bucketId;
                        bucketUpdateData = {
                            accountId: authorized.accountId,
                            bucketId: bucketId,
                            corsRules: [
                                {
                                    "corsRuleName": "allAccessbyos",
                                    "allowedOrigins": ["byosapp.netlifyapp.com", "localhost"],
                                    "allowedHeaders": ["*"],
                                    "allowedOperations": ["s3_delete", "s3_get", "s3_head", "s3_post", "s3_put"],
                                    "exposeHeaders": ["x-bz-content-sha1"],
                                    "maxAgeSeconds": 3600
                                }
                            ]
                        };
                        return [4 /*yield*/, (0, exports.updateBucket)(authorized.apiUrl, authorized.authorizationToken, bucketUpdateData)];
                    case 3:
                        bucketUpdateResponse = _a.sent();
                        console.debug(bucketUpdateResponse);
                        return [2 /*return*/, bucketUpdateResponse];
                    case 4:
                        err_2 = _a.sent();
                        console.error('Error :', err_2.response.data);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    GetBucket();
};
exports.updateCors = updateCors;
(0, exports.updateCors)(process.env.KEY, process.env.SECRET, process.env.BUCKET);
