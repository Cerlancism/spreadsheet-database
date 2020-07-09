"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePost = exports.handleGet = exports.clearCache = void 0;
const entitySystem_1 = require("./entitySystem");
function getCacheKey(sheetName) {
    return "entity_cache-" + sheetName.toLowerCase();
}
function clearCache(sheetName) {
    var _a;
    (_a = CacheService.getScriptCache()) === null || _a === void 0 ? void 0 : _a.remove(getCacheKey(sheetName));
}
exports.clearCache = clearCache;
function putZippedCache(key, value) {
    var _a;
    (_a = CacheService.getScriptCache()) === null || _a === void 0 ? void 0 : _a.put(key, Utilities.base64Encode(Utilities.gzip(Utilities.newBlob(value)).getBytes()));
}
function getZippedCache(key) {
    var _a;
    const zipped = (_a = CacheService.getScriptCache()) === null || _a === void 0 ? void 0 : _a.get(key);
    if (!zipped) {
        return null;
    }
    return Utilities.ungzip(Utilities.newBlob(Utilities.base64Decode(zipped), "application/x-gzip")).getDataAsString();
}
function handleGet(operation, spreadSheet, sheetName) {
    const cacheKey = getCacheKey(sheetName);
    switch (operation.type) {
        case "all": {
            let data = getZippedCache(cacheKey);
            if (data) {
                return data;
            }
            data = JSON.stringify(new entitySystem_1.EntitySet({ spreadSheet, tableName: sheetName }).loadAll());
            putZippedCache(cacheKey, data);
            return data;
        }
        default:
            return JSON.stringify(null);
    }
}
exports.handleGet = handleGet;
function handlePost(operation, postData, spreadSheet, sheetName) {
    clearCache(sheetName);
    switch (operation.type) {
        case "all": {
            const data = JSON.parse(postData);
            const entitySet = new entitySystem_1.EntitySet({ spreadSheet, tableName: sheetName });
            entitySet.updateAll(data);
            return JSON.stringify({ status: "ok" });
        }
        default:
            return JSON.stringify(null);
    }
}
exports.handlePost = handlePost;
