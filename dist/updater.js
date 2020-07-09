"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEntities = void 0;
function updateEntities(spreadSheet, tableName, entities) {
    let tableSheet = spreadSheet.getSheetByName(tableName);
    if (!tableSheet) {
        tableSheet = spreadSheet.insertSheet(tableName);
    }
    const keys = Object.keys(entities[0]);
    const rows = entities.length + 1;
    const columns = keys.length;
    const range = tableSheet.getRange(1, 1, rows, columns);
    tableSheet.clearContents();
    return range.setValues([keys, ...entities.map(x => generateEntityRow(x))]);
}
exports.updateEntities = updateEntities;
function generateEntityRow(entity) {
    return Object.values(entity);
}
