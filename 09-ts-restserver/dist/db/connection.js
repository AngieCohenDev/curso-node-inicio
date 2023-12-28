"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('node', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    //logging: false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map