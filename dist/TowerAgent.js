"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (C), Jupiter Bakakeu
var mindconnect_nodejs_1 = require("@mindconnect/mindconnect-nodejs");
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var sleep, configuration, agent, log, RETRYTIMES, ProducerNames, ArticleNames, TowerNames, consumerNames, Latitudes, Longitudes, index, _loop_1, i, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
                    configuration = require("../TowerAgentConfig.json");
                    agent = new mindconnect_nodejs_1.MindConnectAgent(configuration);
                    log = function (text) { console.log("[" + new Date().toISOString() + "] " + text.toString()); };
                    RETRYTIMES = 5;
                    ProducerNames = ["FATH", "FATH", "SIEMENS", "SIEMENS", "ZNT"];
                    ArticleNames = ["FATHProduct01", "FATHProduct02", "SiemensProduct01", "SiemensProduct02", "ZNTProduct01"];
                    TowerNames = ["Tower@Munchen", "Tower@Augsburg", "Tower@Regensburg", "Tower@Erlangen", "Tower@Stuttgart", "Tower@Frankfurt", "Tower@Fürth", "Tower@Hamburg", "Tower@Hannover", "Tower@Köln"];
                    consumerNames = ["SiemensWerk01", "SiemensWerk2", "SiemensWerk03", "FATHWerk01", "FATHWerk02", "FATHWerk03", "ZNTWerk01", "ZNTWerk02", "ZNTWerk03", "SiemensWerk03"];
                    Latitudes = [48.137154, 48.37154, 49.013432, 49.59099, 48.78232, 50.110924, 49.4954, 53.551086, 52.37052, 50.93333];
                    Longitudes = [11.576124, 10.89851, 12.101624, 11.00783, 9.17702, 8.682127, 10.9444, 9.993682, 9.73322, 6.95];
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < 1000000)) return [3 /*break*/, 14];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 12, , 13]);
                    log("Iteration : " + index);
                    if (!!agent.IsOnBoarded()) return [3 /*break*/, 4];
                    // wrapping the call in the retry function makes the agent a bit more resilliant
                    // if you don't want to retry the operations you can always just call await agent.OnBoard(); instaead.
                    return [4 /*yield*/, mindconnect_nodejs_1.retry(RETRYTIMES, function () { return agent.OnBoard(); })];
                case 3:
                    // wrapping the call in the retry function makes the agent a bit more resilliant
                    // if you don't want to retry the operations you can always just call await agent.OnBoard(); instaead.
                    _a.sent();
                    log("Agent onboarded");
                    _a.label = 4;
                case 4:
                    if (!!agent.HasDataSourceConfiguration()) return [3 /*break*/, 6];
                    return [4 /*yield*/, mindconnect_nodejs_1.retry(RETRYTIMES, function () { return agent.GetDataSourceConfiguration(); })];
                case 5:
                    _a.sent();
                    log("Configuration aquired");
                    _a.label = 6;
                case 6:
                    _loop_1 = function (i) {
                        var values;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    values = [
                                        // Tower Description
                                        { "dataPointId": "1562865940567", "qualityCode": "0", "value": TowerNames[i].toString() },
                                        { "dataPointId": "1562865959864", "qualityCode": "0", "value": consumerNames[i].toString() },
                                        { "dataPointId": "1562865972587", "qualityCode": "0", "value": Latitudes[i].toString() },
                                        { "dataPointId": "1562865985067", "qualityCode": "0", "value": Longitudes[i].toString() },
                                        // Article Names
                                        { "dataPointId": "1562866010556", "qualityCode": "0", "value": ArticleNames[0].toString() },
                                        { "dataPointId": "1562866023819", "qualityCode": "0", "value": ArticleNames[1].toString() },
                                        { "dataPointId": "1562866038103", "qualityCode": "0", "value": ArticleNames[2].toString() },
                                        // ProducerNames
                                        { "dataPointId": "1562866052870", "qualityCode": "0", "value": ProducerNames[0].toString() },
                                        { "dataPointId": "1562866065342", "qualityCode": "0", "value": ProducerNames[1].toString() },
                                        { "dataPointId": "1562866074642", "qualityCode": "0", "value": ProducerNames[2].toString() },
                                        // ArticleQuantities
                                        { "dataPointId": "1562866095876", "qualityCode": "0", "value": (Math.floor((Math.random() * 10) + 50)).toString() },
                                        { "dataPointId": "1562866114679", "qualityCode": "0", "value": (Math.floor((Math.random() * 30) + 20)).toString() },
                                        { "dataPointId": "1562866125742", "qualityCode": "0", "value": (Math.floor((Math.random() * 10) + 100)).toString() }
                                    ];
                                    // same like above, you can also just call  await agent.PostData(values) if you don't want to retry the operation
                                    // this is how to send the data with specific timestamp
                                    // await agent.PostData(values, new Date(Date.now() - 86400 * 1000));
                                    return [4 /*yield*/, mindconnect_nodejs_1.retry(RETRYTIMES, function () { return agent.PostData(values); })];
                                case 1:
                                    // same like above, you can also just call  await agent.PostData(values) if you don't want to retry the operation
                                    // this is how to send the data with specific timestamp
                                    // await agent.PostData(values, new Date(Date.now() - 86400 * 1000));
                                    _a.sent();
                                    log("Data posted --> " + i);
                                    return [4 /*yield*/, sleep(1000)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i < 9)) return [3 /*break*/, 10];
                    return [5 /*yield**/, _loop_1(i)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 7];
                case 10:
                    log("Data posted end.");
                    return [4 /*yield*/, sleep(1000)];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 12:
                    err_1 = _a.sent();
                    // add proper error handling (e.g. store data somewhere, retry later etc. )
                    console.error(err_1);
                    return [3 /*break*/, 13];
                case 13:
                    index++;
                    return [3 /*break*/, 1];
                case 14: return [2 /*return*/];
            }
        });
    });
})();
