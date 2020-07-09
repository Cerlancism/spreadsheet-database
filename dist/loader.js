"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEntities = void 0;
function loadEntities(spreadSheet, tableName) {
    var _a;
    const tableSheet = spreadSheet.getSheetByName(tableName);
    if (!tableSheet) {
        return [];
    }
    const rows = tableSheet.getLastRow();
    const columns = tableSheet.getLastColumn();
    const range = tableSheet.getRange(1, 1, rows, columns);
    const values = range.getValues();
    const propertyNames = (_a = values.shift()) !== null && _a !== void 0 ? _a : [];
    return values.map(x => loadEntity(propertyNames, x));
}
exports.loadEntities = loadEntities;
function loadEntity(propertyNames, row) {
    let entity = {};
    for (let propertyNameIndex = 0; propertyNameIndex < propertyNames.length; propertyNameIndex++) {
        entity[propertyNames[propertyNameIndex]] = row[propertyNameIndex];
    }
    return entity;
}
