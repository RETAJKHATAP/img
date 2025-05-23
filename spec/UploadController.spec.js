"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
describe('GET /upload', () => {
    it('Should return status code 200', async () => {
        const result = await (0, supertest_1.default)(app_1.app).get('/upload').send();
        expect(result.status).toBe(200);
    });
});
