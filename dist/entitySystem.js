"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitySet = void 0;
const loader_1 = require("./loader");
const updater_1 = require("./updater");
const lazy_1 = require("./lazy");
class EntitySet {
    constructor(options) {
        this.spreadSheet = options.spreadSheet;
        this.tableName = options.tableName;
        this.loaded = new lazy_1.Lazy(() => loader_1.loadEntities(this.spreadSheet, this.tableName));
    }
    loadAll() {
        return this.loaded.getValue();
    }
    updateAll(entities) {
        this.loaded = new lazy_1.Lazy(() => loader_1.loadEntities(this.spreadSheet, this.tableName));
        updater_1.updateEntities(this.spreadSheet, this.tableName, entities);
    }
}
exports.EntitySet = EntitySet;
